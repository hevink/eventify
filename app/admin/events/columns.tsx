"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "eventName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (row) => {
      return (
        <Badge color="green" className="text-white">
          {row.row.original.price}
        </Badge>
      );
    },
  },
  {
    accessorKey: "organizer",
    header: "Organize",
  },

  {
    accessorKey: "eventStartDate",
    header: "Date",
    cell: (row) => {
      return format(new Date(row.row.original.eventStartDate), "MM/dd/yyyy");
    },
  },
  {
    accessorKey: "categories",
    header: "Categories",
  },
];
