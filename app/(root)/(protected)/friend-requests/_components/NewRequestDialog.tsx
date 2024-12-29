"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SendRequest } from "@/store/Slices/FriendRequestSlice";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const NewRequestDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { loading } = useAppSelector((state) => state.FriendRequests);
  const { user } = useAppSelector((state) => state.App);
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleAddFriend = () => {
    if (!email) {
      return toast({ title: "Enter email!", variant: "destructive" });
    }
    dispatch(
      SendRequest({
        senderId: user?.id as string,
        receiverEmail: email,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setEmail("");
          setOpen(false);
        },
        onError: (error) => {
          return toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Friends</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friends</DialogTitle>
          <DialogDescription>Add Email to add friends</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            className="mb-4"
            placeholder="Email"
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleAddFriend();
            }}
          />
          <div className="flex justify-end">
            <Button disabled={loading} onClick={handleAddFriend}>
              {loading ? (
                <RefreshCcw className="w-4 h-4 animate-spin" />
              ) : (
                "Send Request"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
