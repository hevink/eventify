"use client"


import React, { FC } from "react";

type Props = {
  Title: string;
  Subtitle?: string;
  className?: string;
};

const Heading: FC<Props> = ({ Title, Subtitle, className }: Props) => {
  return (
    <div className={className}>
      <h1 className="text-4xl font-bold text-gray-700">{Title}</h1>
      <h3 className="font-light text-gray-500">{Subtitle}</h3>
    </div>
  );
};

export default Heading;
