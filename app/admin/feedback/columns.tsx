"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Review, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "eventName",
    header: "Event Name",
    cell: (row) => {
      return row.row.original.eventName ? row.row.original.eventName : "N/A";
    },
  },

  {
    accessorKey: "rating",
    header: "Rating",
    cell: (row) => {
      return (
        <Badge color="green" className="text-white">
          {row.row.original.rating}
        </Badge>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (row) => {
      return format(new Date(row.row.original.createdAt), "MM/dd/yyyy");
    },
  },
];
