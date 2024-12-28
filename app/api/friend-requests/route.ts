"use server";

import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { senderId, receiverEmail } = await request.json();
  if (!senderId || !receiverEmail) {
    return new Response(
      JSON.stringify({ error: "Missing senderId or receiverEmail" }),
      {
        status: 400,
      }
    );
  }
  const receiver = await prisma.user.findUnique({
    where: {
      email: receiverEmail,
    },
  });
  if (!receiver) {
    return new Response(JSON.stringify({ error: "Receiver not found" }), {
      status: 400,
    });
  }
  if (senderId === receiver.id) {
    return NextResponse.json(
      { error: "You can't send request to yourself" },
      { status: 400 }
    );
  }
  const isExist = await prisma.friendRequest.findFirst({
    where: { senderId, receiverId: receiver.id },
  });
  const isExist2 = await prisma.friendRequest.findFirst({
    where: { senderId: receiver.id, receiverId: senderId },
  });
  if (isExist) {
    return NextResponse.json(
      { error: "You've already sent request" },
      { status: 400 }
    );
  }
  if (isExist2) {
    return NextResponse.json(
      { error: "This person has already sent you request" },
      { status: 400 }
    );
  }
  const alreadyFriend = await prisma.friend.findFirst({
    where: { userId: senderId, friendId: receiver.id },
  });
  const alreadyFriend2 = await prisma.friend.findFirst({
    where: { userId: receiver.id, friendId: senderId },
  });
  if (alreadyFriend || alreadyFriend2) {
    return NextResponse.json(
      { error: "You're already friends" },
      { status: 400 }
    );
  }

  const NewRequest = await prisma.friendRequest.create({
    data: {
      senderId,
      receiverId: receiver.id,
    },
  });
  return new Response(JSON.stringify({ message: "Request sent" }), {
    status: 200,
  });
}
