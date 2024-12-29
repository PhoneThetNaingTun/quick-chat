"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SendMessage } from "@/store/Slices/MessageSlice";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const ChatRoomClient = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { chatRoomId } = param;
  const { toast } = useToast();
  const { chats } = useAppSelector((state) => state.Chats);
  const { user } = useAppSelector((state) => state.App);
  const { messages } = useAppSelector((state) => state.Messages);

  const [message, setMessage] = useState<string>("");

  const Chat = chats.find((item) => item.chatRoomId === chatRoomId);
  const friend = Chat?.User;

  const Messages = messages.filter(
    (item) =>
      (item.senderId === friend?.id || item.senderId === user?.id) &&
      item.chatRoomId === chatRoomId
  );

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [Messages]);

  const handleSendMessage = () => {
    if (!message) {
      return null;
    }

    dispatch(
      SendMessage({
        chatRoomId: chatRoomId as string,
        message,
        senderId: user?.id as string,
        onSuccess: () => {
          setMessage("");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <div className=" max-h-full">
      <div className="px-10 h-full">
        {Messages.length > 0 ? (
          Messages.map((item) => (
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
          ))
        ) : (
          <div>
            <p>No Message yet!</p>
          </div>
        )}
      </div>

      <div ref={messageEndRef} />
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
