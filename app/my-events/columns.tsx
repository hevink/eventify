"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Event-name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Delete",
    cell: ({ row }) => {
      const handleDelete = async () => {
        await axios
          .delete(`/api/v1/event/${row.original.id}`)
          .then((res) => {
            console.log(res);
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
