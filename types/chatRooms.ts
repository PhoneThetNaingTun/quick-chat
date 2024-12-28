import { ChatRoom } from "@prisma/client";

export interface chatRoomSlice {
  chatrooms: ChatRoom[];
  loading: boolean;
}
