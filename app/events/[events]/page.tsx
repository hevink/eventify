"use client";

import { getEventById } from "@/actions/getEventById";
import Image from "next/image";
import React, { useEffect } from "react";

type IParams = {
  events: string;
};

const Event = ({ params }: { params: IParams }) => {
  const [events, setEvents] = React.useState<string[]>([]);

  useEffect(() => {
    getEventById(params.events).then((res) => {
      setEvents(res);
    });
  }, [params.events]);

  return <>comeing soon</>;
};

export default Event;
