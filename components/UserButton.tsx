"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CalendarDays, ChevronDown, LogOutIcon, User } from "lucide-react";
import { LogoutButton } from "./Logout-Button";
import Image from "next/image";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-full p-2 pr-2 items-center gap-2 border rounded-full">
          <div className="flex w-[34px] h-[34px] justify-center items-center">
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-sky-500">
                <User className="text-white" />
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="font-semibold">{user?.name}</p>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <Link href="/my-events">
          <DropdownMenuItem>
            <CalendarDays className="h-4 w-4 mr-2" />
            My Events
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
