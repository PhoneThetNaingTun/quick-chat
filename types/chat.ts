import { User } from "@prisma/client";

export type chat = {
  id: string;
  userId: string;
  chatRoomId: string;
  created_At: Date;
  updated_At: Date;
  User?: User;
};
export interface chatSlice {
  chats: chat[];
  loading: boolean;
}
