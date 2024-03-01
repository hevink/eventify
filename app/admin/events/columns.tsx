"use client";

import { Badge } from "@/components/ui/badge";
import { Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "eventName",
    header: "Event Name",
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
