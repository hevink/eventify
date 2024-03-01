"use client";

import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "eventTitle",
        header: "Event Title",
    },
    {
        accessorKey: "event.categories",
        header: "Category",
    },
    {
        accessorKey: "event.price",
        header: "Price",
    },
    {
        accessorKey: "buyer.email",
        header: "Buyer Email",
    },
    {
        accessorKey: "buyer.name",
        header: "Buyer Name",
    },
];
