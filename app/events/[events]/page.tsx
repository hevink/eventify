"use client";

import { getEventById } from "@/actions/getEventById";
import CheckoutButton from "@/components/CheckoutButton";
import Collection from "@/components/Collection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Event } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Calendar, LocateIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";

type IParams = {
  events: string;
};

const Event = ({ params }: { params: IParams }) => {
  const [event, setEvent] = React.useState<Event | null>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getEventById(params.events)
      .then((res) => {
        setEvent(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [params.events]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#9333ea" />
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event?.image ?? ""}
            alt="hero image"
            width={100}
            height={100}
            className="h-full w-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event?.eventName}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {`$${event?.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                    {event?.categories}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by <span className="text-purple-500">{event?.speakers}</span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Calendar />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>{format(event?.eventStartDate ?? new Date(), "PPP")}  </p>
                  <p>{format(event?.eventEndDate ?? new Date(), "PPP")}</p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <LocateIcon />
                <p className="p-medium-16 lg:p-regular-20">{event?.venue}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You&apos;ll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">
                {event?.description}
              </p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event?.pin}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={events}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={"1"} // page={searchParams.page as string}
        // totalPages={relatedEvents?.totalPages}
        />
      </section>
    </MaxWidthWrapper>
  );
};

export default Event;
