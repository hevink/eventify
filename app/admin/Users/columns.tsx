"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "email",
  },

  {
    accessorKey: "emailVerified",
    header: "emailVerified",
    cell: (row) => {
      const emailVerified = row.row.original.emailVerified;
      const formattedDate = emailVerified ? format(new Date(emailVerified), "MM/dd/yyyy") : "Not Verified";
      return formattedDate;
    },
  },
  {
    accessorKey: "role",
    header: "role",
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: "isTwoFactorEnabled",
  },
];
