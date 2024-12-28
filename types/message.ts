import { Chat } from "@prisma/client";
import { BaseOption } from "./app";

export type message = {
  message: string;
  id: string;
  senderId: string;
  chatId: string;
  Chat?: Chat;
};
export interface messageSlice {
  messages: message[];
  loading: boolean;
}

export interface NewMessagePayload extends BaseOption {
  message: string;
  senderId: string;
  chatId: string;
}
