"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { senderId, chatId, message } = await req.json();
  if (!senderId || !chatId || !message) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const ChatExist = await prisma.chat.findFirst({ where: { id: chatId } });
  if (!ChatExist) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }
  await prisma.message.create({
    data: { message, senderId, chatId },
  });
  return NextResponse.json({ message: "Sent" });
}
