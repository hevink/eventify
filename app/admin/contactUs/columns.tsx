"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContacuUs, Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<ContacuUs>[] = [
  {
    accessorKey: "first_name",
    header: "first_name",
  },
  {
    accessorKey: "last_name",
    header: "last_name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "message",
    header: "message",
  },
  {
    accessorKey: "phone_number",
    header: "phone_number",
  }
];
