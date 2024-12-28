import { User } from "@prisma/client";
import { BaseOption } from "./app";

export type friendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
  sender?: User;
};

export interface friendRequestSlice {
  requests: friendRequest[];
  loading: boolean;
}

export interface NewFriendRequestPayload extends BaseOption {
  senderId: string;
  receiverEmail: string;
}

export interface ConfirmFriendRequestPayload extends BaseOption {
  id: string;
}
export interface RemoveFriendRequestPayload extends BaseOption {
  id: string;
}
