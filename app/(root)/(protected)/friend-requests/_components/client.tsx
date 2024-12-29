"use client";
import { Header } from "@/components/Header";
import React from "react";
import { NewRequestDialog } from "./NewRequestDialog";
import { useAppSelector } from "@/store/hooks";

import { RequestCards } from "@/components/RequestCards";

export const FriendRequestPageClient = () => {
  const { requests } = useAppSelector((state) => state.FriendRequests);
  return (
    <div>
      <Header title="Friend Requests" />
      <div className="my-4 flex justify-end">
        <NewRequestDialog />
      </div>

      <div>
        {requests.map((item) => (
          <RequestCards request={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
