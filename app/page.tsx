"use client";

import { getAllEvents } from "@/actions/getAllEvents";
import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Spotlight } from "@/components/ui/Spotlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SparklesCore } from "@/components/ui/sparkles";
import { Event } from "@prisma/client";
import axios from "axios";
import React, { useEffect } from "react";

const eventReviews = [
  {
    review:
      "Attending this event was an incredible experience! The atmosphere was electric, and it truly felt like the best of times. The organizers showed great wisdom in curating such an engaging program. Kudos!",
    name: "Happy Attendee",
    title: "Unforgettable Event",
  },
  {
    review:
      "Being part of this event was a dilemma-free decision. The organizers, like Shakespeare's Hamlet, took arms against any potential troubles. The result? A seamless and enjoyable experience for all attendees.",
    name: "Event Enthusiast",
    title: "Well-Executed Production",
  },
  {
    review:
      "This event was a dream come true! Everything we saw and experienced was like a dream within a dream. Kudos to the event organizers for making it all possible.",
    name: "Dreamer",
    title: "Dreamy Event",
  },
  {
    review:
      "Attending this event was universally acknowledged as a fantastic decision. It felt like being in a Jane Austen novel where good fortune and a delightful atmosphere surrounded everyone. Looking forward to the next one!",
    name: "Social Butterfly",
    title: "A Night to Remember",
  },
  {
    review:
      "Call me an event enthusiast! This experience was like Melville's journey in Moby-Dick. Setting sail into the watery part of the world (the event) was an adventure filled with excitement and discovery.",
    name: "Adventure Seeker",
    title: "Sailing into Excitement",
  },
];

const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        // @ts-ignore
        setEvents(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <MaxWidthWrapper>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#586ACF"
      />
      <Hero />
      <h2 className="h2-bold my-5">Popular Events</h2>
      <div className="my-2">
        <Collection
          data={events}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={"1"}
        // totalPages={events?.totalPages}
        />
      </div>

      <h2 className="h2-bold mt-10">Reviews 🥇</h2>

      <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={eventReviews}
          direction="right"
          speed="slow"
        />
      </div>

      <div className="h-[40rem] w-full bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-black relative z-20">
          Event Hub
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#000"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Event;
