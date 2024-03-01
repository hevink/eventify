import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="h-screen w-full overflow-hidden bg-gray-100/50 dark:bg-gray-800/50">
        <div className="grid h-screen grid-cols-1 overflow-hidden md:grid-cols-[230px_1fr]">
          <div className="hidden md:flex flex-col border-r border-gray-200/50 dark:border-gray-800/50">
            <div className="flex h-16 items-center px-4">
              <Link
                className="flex items-center gap-2 text-xl font-semibold"
                href="#"
              >
                <PackageIcon className="w-6 h-6" />
                <span>Acme Inc</span>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="flex-1">
                <ul className="flex-1">
                  <li className="h-[50px]">
                    <Link
                      className="flex h-full items-center px-4 text-sm font-medium text-gray-500
                      dark:text-gray-400"
                      href="/admin/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="h-[50px]">
                    <Link
                      className="flex h-full items-center px-4 text-sm font-medium text-gray-500
                      dark:text-gray-400"
                      href="#"
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="h-[50px]">
                    <Link
                      className="flex h-full items-center px-4 text-sm font-medium text-gray-500
                      dark:text-gray-400"
                      href="#"
                    >
                      Catalog
                    </Link>
                  </li>
                  <li className="h-[50px]">
                    <Link
                      className="flex h-full items-center px-4 text-sm font-medium text-gray-500
                      dark:text-gray-400"
                      href="#"
                    >
                      Customers
                    </Link>
                  </li>
                  <li className="h-[50px]">
                    <Link
                      className="flex h-full items-center px-4 text-sm font-medium text-gray-500
                      dark:text-gray-400"
                      href="#"
                    >
                      Marketing
                    </Link>
                  </li>
                  <li className="h-[50px]">
                    <Link
                      className="flex h-full items-center px-4 text-sm font-medium text-gray-500
                      dark:text-gray-400"
                      href="#"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <header className="flex h-16 items-center border-b border-gray-200/50 dark:border-gray-800/50 px-4">
              <Button
                className="rounded-md md:hidden"
                size="icon"
                variant="outline"
              >
                <ChevronLeftIcon className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
              <div className="flex-1 ml-4 text-lg font-semibold">Catalog</div>
              <div className="flex items-center gap-4 md:ml-auto">
                <Button className="rounded-full" size="icon" variant="outline">
                  <SearchIcon className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button className="rounded-full" size="icon" variant="outline">
                  <BellIcon className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <Button className="rounded-full" size="icon" variant="outline">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height={32}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width={32}
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
