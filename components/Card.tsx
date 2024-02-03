import { format } from "date-fns";
import { CalendarRange } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: any;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { data: sessionClaims } = useSession();
  const userId = sessionClaims?.user.id;

  const isEventCreator = userId === event.id;

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.image})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENTp CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event.id}/update`}>
            <Image src={event.image} alt="edit" width={20} height={20} />
          </Link>

          {/* <DeleteConfirmation eventId={event.id} /> */}
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 ">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-auto rounded-full bg-gray-500/10 px-4 py-1 line-clamp-1">
              {event?.categories}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500 flex items-center">
          <CalendarRange className="mr-2" />{" "}
          {format(event?.eventStartDate, "PPP")} - {event?.time}
        </p>

        <Link href={`/events/${event.id}`}>
          <p className=" text-[16px] font-medium leading-[24px] md:text-[20px] md:leading-[30px]; line-clamp-2 flex-1 text-black">
            {event.eventName}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {sessionClaims?.user.name}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event.id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
