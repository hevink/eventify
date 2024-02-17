"use client";

import Collection from "@/components/Collection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Event } from "@prisma/client";
import axios from "axios";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
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
    <MaxWidthWrapper className="my-2">
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events</h3>
          {/* <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events">Explore More Events</Link>
          </Button> */}
        </div>
      </section>

      <Collection
        data={events}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={"1"}
      />
    </MaxWidthWrapper>
  );
};

export default Event;
