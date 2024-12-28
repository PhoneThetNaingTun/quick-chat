import { User } from "@prisma/client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface Prop {
  user?: User;
}

export const ConversationCard = ({ user }: Prop) => {
  return (
    <Card className="w-full py-2">
      <CardContent className="flex items-center gap-2 pb-0">
        <Image
          src={user?.image || "/file.svg"}
          alt={user?.image || ""}
          width={500}
          height={500}
          className="w-14 h-14 object-cover rounded-full"
        />
        <div>
          <p className="font-bold">{user?.name}</p>
        </div>
      </CardContent>
    </Card>
  );
};
