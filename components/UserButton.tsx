"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogOutIcon, RemoveFormattingIcon, User } from "lucide-react";
import { LogoutButton } from "./Logout-Button";
import Image from "next/image";

export const UserButton = () => {
  const user = useCurrentUser();

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar> */}
        {user?.image && (
          <Image
            className="rounded-full"
            height={60}
            width={60}
            src={user?.image || ""}
            alt={"Image"}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
