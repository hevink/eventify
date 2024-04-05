"use client";

import { Event } from "@prisma/client";
import { format } from "date-fns";
import { CalendarRange } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { redirect } from "next/navigation";

type CardProps = {
  event: Event;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  review?: boolean;
};

const Card = ({ event, review }: CardProps) => {
  const [rating, setRating] = React.useState("");
  const [reviewText, setReviewText] = React.useState("");

  const handleSubmit = async () => {
    if (!rating || !reviewText) {
      toast({
        title: "Please fill all fields",
        className: "bg-red-500 text-white",
      });
      return false;
    }
    const response = await axios.post("/api/review", {
      rating,
      message: reviewText,
      eventName: event?.eventName,
    });

    if (response.status === 200) {
      toast({
        title: "Review submitted successfully",
        className: "bg-green-500 text-white",
      });

      redirect("/profile");
    }
  };
  return (
    event && (
      <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <Link
          href={`/events/${event?.id}`}
          style={{ backgroundImage: `url(${event?.image})` }}
          className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />

        <div className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4">
          {/* {!hidePrice && ( */}
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 ">
              {event?.isFree ? "FREE" : `$${event?.price}`}
            </span>
            <p className="p-semibold-14 w-auto rounded-full bg-gray-500/10 px-4 py-1 line-clamp-1">
              {event?.categories}
            </p>
          </div>
          {/* )} */}

          <p className="p-medium-16 p-medium-18 text-grey-500 flex items-center">
            <CalendarRange className="mr-2" />{" "}
            {format(event?.eventStartDate, "PPP")} - {event?.time}
          </p>

          <Link href={`/events/${event?.id}`}>
            <p className=" text-[16px] font-medium leading-[24px] md:text-[20px] md:leading-[30px]; line-clamp-2 flex-1 text-black">
              {event?.eventName}
            </p>
          </Link>

          <div className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600 flex items-center gap-1">
              Organized by <p className="text-purple-500">{event?.organizer}</p>
            </p>
          </div>
          {review && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Review</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Review Event </DialogTitle>
                  <DialogDescription>
                    Share your experience with the community
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Rating
                    </Label>
                    <Select onValueChange={(e) => setRating(e)}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select Value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Review
                    </Label>
                    <Textarea
                      id="username"
                      placeholder="Write your review here..."
                      className="col-span-3"
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    )
  );
};

export default Card;
