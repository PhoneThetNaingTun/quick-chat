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
  await prisma.friendRequest.delete({ where: { id } });
  return NextResponse.json({ message: "Request removed" }, { status: 200 });
}