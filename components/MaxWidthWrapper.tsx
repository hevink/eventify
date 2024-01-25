"use client"

import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-[1500px] p-3 md:p-0 mx-auto", className)}>{children}</div>
  );
};

export default MaxWidthWrapper;
