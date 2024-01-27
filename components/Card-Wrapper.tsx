"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Heading from "./Heading";
import { Button } from "./ui/button";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <span className="font-bold text-4xl text-center border-b pb-4 mb-4">
          <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
            Eventify
          </div>
        </span>
        {headerLabel}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      <CardFooter>
        <Link className="w-full" href={backButtonHref}>
          <Button className="w-full" variant="outline">
            {backButtonLabel}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
