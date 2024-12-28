"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    };
  }[];
}) {
  const { requests } = useAppSelector((state) => state.FriendRequests);
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <div key={item.title}>
            {item.title === "Friend Requests" ? (
              <SidebarMenuItem
                key={item.title}
                className={cn(" rounded-sm", item.isActive && "bg-gray-200")}
              >
                <Link href={item.url}>
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    <span>
                      {item.title}{" "}
                      {requests.length > 0 && (
                        <span className="ml-2 rounded-full bg-red-500 px-2 py-2 text-xs text-white">
                          {requests.length}
                        </span>
                      )}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem
                key={item.title}
                className={cn(" rounded-sm", item.isActive && "bg-gray-200")}
              >
                <Link href={item.url}>
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
