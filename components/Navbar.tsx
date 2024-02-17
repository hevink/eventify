"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "./UserButton";
import { useSession } from "next-auth/react";
import { ModeToggle } from "./Mode-toggle";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "List Event",
    href: "/list-event",
  },
];

export function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full border-b">
      <MaxWidthWrapper>
        <div className="mx-auto flex items-center justify-between py-2">
          <div className="inline-flex items-center space-x-2">
            <Link href="/" className="font-bold text-2xl pr-10 border-r border-gray-500">
              <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent text-center">
                EventHub
              </div>
            </Link>
            <div className="hidden lg:block md:pl-10 ">
              <ul className="inline-flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-sm  font-medium ${pathName === item.href
                        ? " border-b-2 border-blue-600 bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"
                        : ""
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden lg:block items-center ">
            <ModeToggle />
            {!session && (
              <>
                <Link href="/login">
                  <Button type="button" variant="ghost" className="mr-2 ">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 p-4"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
            {session && <UserButton />}
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="border-b pb-3">
                    <Link href="/" className="font-bold text-4xl ">
                      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                        EventHub
                      </div>
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    <ul className=" flex flex-col">
                      {menuItems.map((item) => (
                        <Button variant="ghost" key={item.name}>
                          <Link
                            href={item.href}
                            className={`text-sm font-semibold ${pathName === item.href
                              ? " border-b-2 border-blue-600 bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"
                              : ""
                              }`}
                          >
                            {item.name}
                          </Link>
                        </Button>
                      ))}
                    </ul>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
