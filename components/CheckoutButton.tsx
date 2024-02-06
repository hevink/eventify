"use client";

import { Event } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: any }) => {
  const { data: sessionClaims } = useSession();
  const userId = sessionClaims?.user?.id;

  // const hasEventFinished = new Date(event?.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : ( */}
      <>
        {!userId ? (
          <Button asChild className="button rounded-full" size="lg">
            <Link href="/login">Get Tickets</Link>
          </Button>
        ) : (
          <Checkout event={event} userId={userId} />
        )}
      </>
      {/* )} */}
    </div>
  );
};

export default CheckoutButton;
