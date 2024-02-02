"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

const ListEvent = () => {
  const { toast } = useToast();

  const form = useForm({
    // resolver: zodResolver(eventSchema),
  });

  function onSubmit(values: any) {
    console.log(values);
    axios
      .post("http://localhost:3000/api/v1/events", values)
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

  return (
    <MaxWidthWrapper className={"max-w-5xl"}>
      <Heading
        className="py-10"
        Title="List Your Event 🎊"
        Subtitle={"List your Event Here"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
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
            name="organizer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Organizer Name" {...field} />
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Heading Title="Location 📍 " titleClassName="text-2xl border-b" />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>street</FormLabel>
                <FormControl>
                  <Input placeholder="street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="block md:flex items-center w-full gap-3 py-1">
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

          <Heading Title="Image 📳" titleClassName="text-2xl border-b py-1" />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </FormItem>
            )}
          />
          <div className="block md:flex items-center w-full gap-3 py-1">
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
          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default ListEvent;

{
  /* <Heading Title="Contact 📳" titleClassName="text-2xl border-b py-1" />

          <div className="block md:flex items-center w-full gap-3">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */
}
{
  /* <Heading Title="Social Media 📱" titleClassName="text-2xl border-b" />

          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="Twitter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube</FormLabel>
                <FormControl>
                  <Input placeholder="Youtube" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */
}

{
  /* <Heading Title="Event Image 📷" titleClassName="text-2xl border-b" />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */
}

{
  /* <Heading Title="Tickets 🎟️" titleClassName="text-2xl border-b" />

          <FormField
            control={form.control}
            name="ticketName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ticketPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Price</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ticketQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */
}
