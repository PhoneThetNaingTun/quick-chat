"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SendMessage } from "@/store/Slices/MessageSlice";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ChatRoomClient = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { chatRoomId } = param;
  const { toast } = useToast();
  const { chats } = useAppSelector((state) => state.Chats);
  const { user } = useAppSelector((state) => state.App);
  const { messages } = useAppSelector((state) => state.Messages);

  const [message, setMessage] = useState<string>("");

  const Chat = chats.filter((item) => item.chatRoomId === chatRoomId);
  const forMessage = Chat[0];
  const Messages = messages.filter((item) => item.chatId === forMessage?.id);

  const FriendDetail = Chat.find((item) => item.userId !== user?.id);
  const friend = FriendDetail?.User;
  const handleSendMessage = () => {
    if (!message) {
      return null;
    }

    dispatch(
      SendMessage({
        chatId: forMessage?.id as string,
        message,
        senderId: user?.id as string,
        onSuccess: (message) => {
          setMessage("");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <div>
      <div className="px-10">
        {/* {Messages.map((item) => (
          <div
            className={cn(
              "flex gap-2 my-10",
              item.senderId === user?.id && "flex-row-reverse"
            )}
          >
            <p
              className={cn(
                `text-start px-5 py-2 bg-gray-600 rounded-full text-white w-fit`,
                item.senderId === user?.id && `text-end`
              )}
            >
              {item.message}
            </p>
          </div>
        ))} */}
        {Messages.map((item) => (
          <div key={item.id} className="flex w-full py-2">
            {item.senderId === user?.id ? (
              <div className="flex items-end gap-2 w-full justify-end">
                <p className="px-4 py-2 bg-black text-white rounded-lg text-sm max-w-sm break-words">
                  {item.message}
                </p>
                <Image
                  src={user?.image || "/file.svg"}
                  alt={user?.name || "User Avatar"}
                  width={500}
                  height={500}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="flex items-start gap-2 w-full">
                <Image
                  src={friend?.image || "/file.svg"}
                  alt={friend?.name || "Friend Avatar"}
                  width={500}
                  height={500}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <p className="px-4 py-2 bg-black text-white rounded-lg text-sm max-w-sm break-words">
                  {item.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 left-0 right-0 flex gap-2 items-center p-4 bg-white border-t">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <Button onClick={handleSendMessage} disabled={!message}>
          <SendIcon />
        </Button>
      </div>
    </div>
  );
};
