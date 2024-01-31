import axios from "axios";
import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Event } from "@prisma/client";
import { myEvent } from "@/actions/my-event";

async function getData(): Promise<Event[]> {
  try {
    const result = await myEvent();

    if (Array.isArray(result)) {
      return result;
    } else {
      console.log(result.error);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

const MyEvents = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MyEvents;
