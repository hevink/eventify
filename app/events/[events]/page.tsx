"use client";

import axios from "axios";
import React, { useEffect } from "react";

type IParams = {
  events: string;
};

const Event = ({ params }: { params: IParams }) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/events")
      .then((res) => {
        console.log(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>{params.events}</div>;
};

export default Event;
