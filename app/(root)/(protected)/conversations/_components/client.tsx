"use client";

import { ConversationCard } from "@/components/ConversationCard";
import { Header } from "@/components/Header";

import { useAppSelector } from "@/store/hooks";

import Link from "next/link";

export const ConversationPageClient = () => {
  const { chats } = useAppSelector((state) => state.Chats);
  return (
    <div>
      <Header title="Conversations" />
      <div className="space-y-2">
        {chats.length > 0 ? (
          chats.map((item) => (
            <Link key={item.id} href={`/conversations/${item.chatRoomId}`}>
              <ConversationCard user={item.User} />
            </Link>
          ))
        ) : (
          <p>No Friends</p>
        )}
      </div>
    </div>
  );
};
