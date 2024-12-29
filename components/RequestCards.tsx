"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { friendRequest } from "@/types/friend-request";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ConfirmRequest,
  RemoveRequest,
} from "@/store/Slices/FriendRequestSlice";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

interface Prop {
  request: friendRequest;
}

export const RequestCards = ({ request }: Prop) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.FriendRequests);
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
            disabled={loading}
            onClick={() => {
              handleConfirm(request.id);
            }}
          >
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={() => {
              handleCancel(request.id);
            }}
            disabled={loading}
          >
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              "Cancel"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
