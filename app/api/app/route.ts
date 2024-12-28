"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/middleware";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (session) {
    const { user } = session;
    const email = user?.email as string;
    const userFromDb = await prisma.user.findUnique({ where: { email } });
    if (userFromDb) {
      const requests = await prisma.friendRequest.findMany({
        where: { receiverId: userFromDb.id },
        include: { sender: true },
      });
      const userChats = await prisma.chat.findMany({
        where: { userId: userFromDb.id },
      });
      const chatRoomIds = userChats.map((chat) => chat.chatRoomId);
      const chatRooms = await prisma.chatRoom.findMany({
        where: { id: { in: chatRoomIds } },
      });
      const chats = await prisma.chat.findMany({
        where: {
          chatRoomId: { in: chatRoomIds },
          NOT: { userId: userFromDb.id },
        },
        include: { User: true },
      });
      const messages = await prisma.message.findMany({
        where: { chatId: { in: chats.map((item) => item.id) } },
      });
      return NextResponse.json({
        user: userFromDb,
        requests,
        chats,
        messages,
        chatRooms,
      });
    }
  }
}
