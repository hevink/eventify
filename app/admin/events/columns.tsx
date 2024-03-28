"use client";

import { deleteEvent } from "@/actions/deleteEvent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { ArrowUpDown, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
    header: "Organizer",
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const handleDelete = async () => {
        await deleteEvent(row.original.id)
          .then((res) => {
            router.refresh();
            toast({
              title: "Event deleted",
              description: "Event deleted successfully",
            });
          })
          .catch((err) => {
            toast({
              title: err,
              description: "something went wrong",
              type: "foreground",
            });
          });
      };
      return (
        <Button variant="destructive" onClick={handleDelete}>
          <Trash className="h-5 w-5 mr-2" />
          Delete
        </Button>
      );
    },
  },
];
