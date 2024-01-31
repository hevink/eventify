"use client";

import { Event } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import React, { useEffect } from "react";

const Event = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
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
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {events.map((event, i) => (
        <div key={i} className="rounded-md border">
          {/* <Image
            src={event?.image}
            alt="Laptop"
            height={400}
            width={400}
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          /> */}
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">
              {event?.name}
            </h1>
            <p className="mt-3 text-sm text-gray-600">{event?.description}</p>
            {event?.date && (
              <div className="mt-4">
                <span className="mb-2 mr-2 inline-block rounded-lg bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  {format(new Date(event?.date), "dd MMM yyyy")}
                </span>
              </div>
            )}
            <div className="mt-3 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Colors : </span>
              <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
              <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
              <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
            </div>
            <div className="mt-5 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Size : </span>
              <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                8 UK
              </span>
              <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                9 UK
              </span>
              <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                10 UK
              </span>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Event;
