"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/",
  },
  {
    name: "List Event",
    href: "/list-event",
  },
];

export function Navbar() {
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white border-b">
      <MaxWidthWrapper>
        <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <Link href="/" className="font-bold text-4xl">
              <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Eventify
              </div>
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm font-semibold ${
                      pathName === item.href
                        ? " border-b-2 border-blue-600 bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"
                        : "text-gray-800 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block ">
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
          </div>
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                        Eventify
                      </div>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <Link
                          href={item.href}
                          key={item.name}
                          className={`text-sm font-semibold ${
                            pathName === item.href
                              ? "bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"
                              : "text-gray-800 hover:text-gray-900"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="w-full my-2">
                    <Link href="/login" className="w-full">
                      <Button
                        type="button"
                        className="w-full mb-2"
                        variant="outline"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 w-full"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
