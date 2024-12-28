import { User } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
}

export interface appSlice {
  user: User | null;
  loading: boolean;
  init: boolean;
}
