import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ContacuUs, User,  } from "@prisma/client";
import { contactUs } from "@/actions/getAllContactUs";
import { getAllUsers } from "@/actions/getAllUsers";

async function getData(): Promise<User[]> {
  const data = await getAllUsers();

  return data.response as User[];
}

export default async function Admin() {
  const data = await getData();
  return (
    <div className=" min-h-screen w-full overflow-hidden ">
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <h1 className="font-semibold text-lg">Recent Events</h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="border shadow-sm rounded-lg p-2">
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </div>
    </div>
  );
}

function Package2Icon(props: any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
