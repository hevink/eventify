"use client";

import Collection from "@/components/Collection";
import { Event } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  const router = useRouter();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events`)
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Collection
      data={events}
      emptyTitle="No Events Found"
      emptyStateSubtext="Come back later"
      collectionType="All_Events"
      limit={6}
      page={"1"}
      // totalPages={events?.totalPages}
    />
  );
};

export default Event;
