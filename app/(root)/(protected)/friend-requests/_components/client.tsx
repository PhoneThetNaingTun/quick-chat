"use client";
import { Header } from "@/components/Header";
import React, { useEffect } from "react";
import { NewRequestDialog } from "./NewRequestDialog";
import { supabase } from "@/lib/supabase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addRequests, removeRequests } from "@/store/Slices/FriendRequestSlice";

import { RequestCards } from "@/components/RequestCards";
import { useToast } from "@/hooks/use-toast";

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
