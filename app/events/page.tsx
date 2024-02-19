"use client";

import { getAllEvents } from "@/actions/getAllEvents";
import Collection from "@/components/Collection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import useDebouncedValue from "@/hooks/useDebounce";
import { Event } from "@prisma/client";
import React, { useEffect } from "react";
const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    getAllEvents(debouncedSearch)
      .then((res) => {
        // @ts-ignore
        setEvents(res);
        setLoading(true);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(true);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch]);

  return (
    <MaxWidthWrapper className="my-2">
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events</h3>
          <Input
            placeholder="Search your favourite events..."
            className="w-[30%]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <Collection
        data={events}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={"1"}
        loading={loading}
      />
    </MaxWidthWrapper>
  );
};

export default Event;
