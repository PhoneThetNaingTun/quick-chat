"use client";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchApp } from "@/store/Slices/AppSlice";
import { RefreshCcw } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { addRequests, removeRequests } from "@/store/Slices/FriendRequestSlice";
import { useToast } from "@/hooks/use-toast";
import { addChat } from "@/store/Slices/ChatSlice";
import { addMessage } from "@/store/Slices/MessageSlice";

interface Prop {
  children: ReactNode;
}

const AppLayout = ({ children }: Prop) => {
  const dispatch = useAppDispatch();
  const { init, loading } = useAppSelector((state) => state.App);

  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.App);
  useEffect(() => {
    if (!init) {
      dispatch(fetchApp());
    }
  }, [init]);
  useEffect(() => {
    const chatSubscription = supabase
      .channel("Chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Chat" },
        async (payload: any) => {
          console.log(payload.new);

          if (payload.new.userId === user?.id) {
            try {
              // Fetch the related ChatRoom
              const { data: ChatRoom, error: chatRoomError } = await supabase
                .from("ChatRoom")
                .select("*")
                .eq("id", payload.new.chatRoomId)
                .single();

              if (chatRoomError)
                throw new Error(
                  `Error fetching ChatRoom: ${chatRoomError.message}`
                );

              // Fetch the related Chat (with userId not equal to current userId)
              const { data: Chat, error: chatError } = await supabase
                .from("Chat")
                .select("*")
                .eq("chatRoomId", ChatRoom?.id)
                .neq("userId", user?.id)
                .single();

              if (chatError)
                throw new Error(`Error fetching Chat: ${chatError.message}`);

              // Fetch the User associated with the Chat
              const { data: User, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("id", Chat.userId)
                .single();

              if (userError)
                throw new Error(`Error fetching User: ${userError.message}`);

              // Enrich the Chat with User data
              const enrichedChat = {
                ...Chat,
                User, // Add the User data to the Chat
              };

              // Dispatch the enriched chat data
              dispatch(addChat(enrichedChat));
            } catch (error) {
              // Catch any errors and log them
              console.error("Error in chat subscription:", error);
            }
          }
        }
      )
      .subscribe();

    const friendRequestSubscription = supabase
      .channel("Friend-Request")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "FriendRequest" },
        async (payload: any) => {
          if (payload.new.receiverId === user?.id) {
            const { data: sender, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.senderId)
              .single();
            if (error) {
              console.error("Error fetching sender:", error);
            } else {
              const enrichedRequest = {
                ...payload.new,
                sender,
              };
              dispatch(addRequests(enrichedRequest));
              toast({
                title: "Friend Request",
                description: `" ${sender?.name} " sent you a friend request`,
              });
            }
          }
        }
      )
      .subscribe();

    const friendCancelSubscription = supabase
      .channel("Friend-Cancel")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "FriendRequest" },
        (payload: any) => {
          dispatch(removeRequests(payload.old.id));
        }
      )
      .subscribe();

    const messageSendSubscription = supabase
      .channel("Message-Send")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Message" },
        async (payload: any) => {
          try {
            console.log(payload.new);

            // Fetch ChatRoom details
            const { data: ChatRoom, error: chatRoomError } = await supabase
              .from("ChatRoom")
              .select("*")
              .eq("id", payload.new.chatRoomId)
              .single();
            if (chatRoomError || !ChatRoom) {
              throw new Error(
                `Error fetching ChatRoom: ${chatRoomError?.message}`
              );
            }
            console.log(ChatRoom);

            // Fetch sender details
            const { data: sender, error: senderError } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.senderId)
              .single();

            if (senderError || !sender) {
              throw new Error(`Error fetching sender: ${senderError?.message}`);
            }

            // Fetch associated chats for the chatroom
            const { data: Chat, error: ChatError } = await supabase
              .from("Chat")
              .select("*")
              .eq("chatRoomId", ChatRoom.id);

            if (ChatError || !Chat || Chat.length === 0) {
              throw new Error(`Error fetching Chat: ${ChatError?.message}`);
            }

            if (Chat[0].userId === user?.id || Chat[1].userId === user?.id) {
              const enrichedMessage = {
                ...payload.new,
                sender,
              };

              dispatch(addMessage(enrichedMessage));
              if (payload.new.senderId !== user?.id) {
                toast({
                  title: "New Message",
                  description: `"${sender.name}" sent you a message`,
                });
              }
            }
          } catch (error) {
            console.error("Error in message subscription:", error);
          }
        }
      )
      .subscribe();
    return () => {
      friendRequestSubscription.unsubscribe();
      friendCancelSubscription.unsubscribe();
      chatSubscription.unsubscribe();
      messageSendSubscription.unsubscribe();
    };
  }, [dispatch, user]);
  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <RefreshCcw className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <div className="px-5">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  );
};

export default AppLayout;
