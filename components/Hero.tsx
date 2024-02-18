"use client";

import React, { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Collection from "./Collection";
import { getLatestEvent } from "@/actions/getSingleEvent";
import Link from "next/link";

const Hero = () => {
  const [event, setEvent] = React.useState([]);

  useEffect(() => {
    getLatestEvent()
      .then((res) => {
        // @ts-ignore
        setEvent(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <MaxWidthWrapper className="">
      <div className="block md:flex my-16">
        <div className="w-full md:w-2/3">
          <p className="font-bold text-6xl">
            Discover and Book <br /> Exciting Events Online
          </p>
          <p className="font-extralight mt-5">
            Explore a Wide Range of Events and Artists
          </p>
          <div className="flex gap-5 mt-10 items-center">
            <Link href="/events">
              <Button className="rounded-3xl px-8">Browse Event</Button>
            </Link>
            <Link href="/list-event">
              <Button className="rounded-3xl px-8 shadow-2xl" variant="outline">
                Create Event
              </Button>
            </Link>
          </div>
          <div className=" flex items-center mt-20">
            <div className="border-r pr-10">
              <div className="text-3xl">7K +</div>
              <div className="">Events</div>
            </div>
            <div className="px-10 border-r">
              <div className="text-3xl">1K +</div>
              <div className="">Artists</div>
            </div>
            <div className="px-10">
              <div className="text-3xl">250K +</div>
              <div className="">Active Users</div>
            </div>
          </div>
        </div>
        <div className="block md:w-1/3">
          <Collection
            data={event}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={1}
            page={"1"}
            className="w-full"
            // totalPages={events?.totalPages}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
