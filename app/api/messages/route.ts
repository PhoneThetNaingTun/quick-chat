"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { senderId, chatRoomId, message } = await req.json();
  if (!senderId || !chatRoomId || !message) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const ChatRoomExist = await prisma.chatRoom.findFirst({
    where: { id: chatRoomId },
  });
  if (!ChatRoomExist) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }
  await prisma.message.create({
    data: { message, senderId, chatRoomId },
  });
  return NextResponse.json({ message: "Sent" });
}
