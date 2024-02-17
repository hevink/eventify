"use client";

import Collection from "@/components/Collection";
import { Event } from "@prisma/client";
import axios from "axios";
import { formatDate } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events`)
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
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
    />
  );
};

export default Event;
