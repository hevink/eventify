"use client";

import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Spotlight } from "@/components/ui/Spotlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
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
    </MaxWidthWrapper>
  );
};

export default Event;
