"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { friendRequest } from "@/types/friend-request";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/store/hooks";
import {
  ConfirmRequest,
  RemoveRequest,
} from "@/store/Slices/FriendRequestSlice";
import { useToast } from "@/hooks/use-toast";

interface Prop {
  request: friendRequest;
}

export const RequestCards = ({ request }: Prop) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleCancel = (id: string) => {
    dispatch(
      RemoveRequest({
        id,
        onSuccess: (message) => {
          toast({ title: message });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleConfirm = (id: string) => {
    dispatch(
      ConfirmRequest({
        id,
        onSuccess: (message) => {
          toast({ title: message });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Card className="py-2">
      <CardContent className="pb-0  flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={request.sender?.image || "/file.svg"}
            alt={""}
            width={500}
            height={500}
            className="w-14 h-14 object-cover rounded-full"
          />
          <div>
            <p className="font-bold">{request.sender?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-500 hover:bg-green-700"
            onClick={() => {
              handleConfirm(request.id);
            }}
          >
            Accept
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={() => {
              handleCancel(request.id);
            }}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
