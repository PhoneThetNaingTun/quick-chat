"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const isExist = await prisma.friendRequest.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Request not found" }, { status: 400 });
  }
  await prisma.friend.create({
    data: { userId: isExist.receiverId, friendId: isExist.senderId },
  });
  const NewChatRoom = await prisma.chatRoom.create({ data: {} });
  await prisma.chat.create({
    data: { userId: isExist.senderId, chatRoomId: NewChatRoom.id },
  });
  await prisma.chat.create({
    data: { userId: isExist.receiverId, chatRoomId: NewChatRoom.id },
  });
  await prisma.friendRequest.delete({ where: { id } });
  return NextResponse.json({ message: "Request confirmed" }, { status: 200 });
}
