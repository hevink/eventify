"use client";

import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Event } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

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
    <MaxWidthWrapper>
      <Hero />
      <h2 className="h2-bold my-5">Popular Events</h2>
      <Collection
        data={events}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={"1"}
      // totalPages={events?.totalPages}
      />
    </MaxWidthWrapper>
  );
};


export default Event;
