"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/Heading";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { eventSchema } from "@/schemas";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

const ListEvent = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  console.log(form.formState.errors);

  const [value, setValue] = useState<string | null>(null);

  function onSubmit(values: z.infer<typeof eventSchema>) {
    const extendedValues = {
      ...values,
      image: value,
    };
    axios
      .post("http://localhost:3000/api/v1/events", extendedValues)
      .then((response) => {
        if (response.status === 200) {
          form.reset();
          toast({
            title: "Event Listed Successfully 🎉",
            description: "Your event has been listed successfully",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleUpload = useCallback((result: any) => {
    setValue(result.info.secure_url);
  }, []);

  return (
    <MaxWidthWrapper className={"max-w-5xl"}>
      <Heading
        className="py-10"
        Title="List Your Event 🎊"
        Subtitle="List your event and let the world know about it. 🌍"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Heading Title="Event " titleClassName="text-2xl border-b py-1" />
          <div className="block md:grid lg:grid-cols-2 xl:grid-cols-2 items-center w-full gap-3 py-1">
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event-Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New Year Party 2024 🎆" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="6969" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal mt-1 ",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal mt-1 ",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Heading Title="Location 📍 " titleClassName="text-2xl border-b" />
          <div className="block md:grid lg:grid-cols-2 xl:grid-cols-2 items-center w-full gap-3 py-1">
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Venue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>city</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>state</FormLabel>
                  <FormControl>
                    <Input placeholder="state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>country</FormLabel>
                  <FormControl>
                    <Input placeholder="country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="387987" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="block md:grid lg:grid-cols-2 xl:grid-cols-2 items-center w-full gap-3 py-1">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter capacity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter categorie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speakers"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Speakers</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter speakers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tags" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Heading Title="Image 📳" titleClassName="text-2xl border-b py-1" />

          <div className="block md:flex w-full gap-3">
            <div className="w-full md:w-1/2">
              <CldUploadWidget
                onUpload={handleUpload}
                uploadPreset="jloy1x1e"
                options={{
                  maxFiles: 1,
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      onClick={() => {
                        open?.();
                      }}
                      className="relative rounded-xl cursor-pointer hover:opacity-70  transition border-2 p-20  flex flex-col justify-center items-center gap-4 "
                    >
                      <PlusCircleIcon className="h-12 w-12" />
                      <div className="font-semibold text-lg">
                        Click To Upload
                      </div>
                      <div className="">
                        {value && (
                          <div className="absolute inset-0 w-full h-full">
                            <Image
                              alt="upload "
                              fill
                              style={{ objectFit: "cover" }}
                              src={value}
                              className="rounded-xl"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>
            <div className="w-full md:w-1/2 mt-2 md:mt-0">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="h-[270px] rounded-xl w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default ListEvent;
