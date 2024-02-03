"use client";

import { Event } from "@prisma/client";
import axios from "axios";
import { formatDate } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/events")
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-start">
      {/* <div className="">filter</div> */}
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {events.map((event, i) => (
          <div
            key={i}
            onClick={() => router.push(`/events/${event.id}`)}
            className="rounded-md border cursor-pointer"
          >
            <Image
              src={event?.image ?? ""}
              alt="Laptop"
              height={400}
              width={400}
              className="w-full rounded-md md:aspect-auto md:h-[400px] lg:h-[350px] group-hover:scale-110 transition"
            />
            <div className="p-2">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {event?.name}
              </h1>
              <p className="text-sm text-gray-600">{event.street}</p>
              <p className="text-sm text-gray-600">{event.categories}</p>

              <p className="text-sm text-gray-600">{event.price}₹ onwards</p>
              <p className="text-sm text-gray-600">
                {event.date ? formatDate(event.date, "PPP") : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
