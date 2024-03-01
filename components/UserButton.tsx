"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  AudioWaveformIcon,
  CalendarDays,
  ChevronDown,
  LogOutIcon,
  User,
  User2Icon,
} from "lucide-react";
import { LogoutButton } from "./Logout-Button";
import Image from "next/image";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-full p-2 pr-2 items-center gap-2 border rounded-full">
          <div className="flex w-[30px] h-[30px] justify-center items-center">
            <Avatar className="h-[30px] w-[30px]">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-sky-500">
                <User className="text-white h-[30px] w-[30px]" />
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="font-semibold text-sm">{user?.name}</p>
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
        <Link href="/profile">
          <DropdownMenuItem>
            <User2Icon className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/admin">
          <DropdownMenuItem>
            <AudioWaveformIcon className="h-4 w-4 mr-2" />
            Admin
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
