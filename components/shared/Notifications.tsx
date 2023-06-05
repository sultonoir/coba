import { SafeNotifications, SafeUser } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { RxBell } from "react-icons/rx";
import { GoPrimitiveDot } from "react-icons/go";
import useData from "@/hooks/useData";
import { Skeleton } from "../ui/skeleton";

interface NotificationsProps {
  currentUser: SafeUser | null;
}

export default function Notifications({ currentUser }: NotificationsProps) {
  const { data, isLoading, error } = useData(`api/admin/${currentUser?.id}`);

  if (isLoading) {
    return <Skeleton className=" rounded-full w-[45px] h-[45px]" />;
  }
  if (error) {
    return null;
  }
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button className="p-3 border border-neutral-200 hover:shadow-md transition cursor-pointer rounded-full">
          <span className="relative">
            <RxBell
              size={20}
              aria-hidden="true"
            />
            {data?.notification && (
              <span className="animate-pulse absolute top-0 right-0 text-rose-500">
                <GoPrimitiveDot size={20} />
              </span>
            )}
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => {
                const { data, isLoading, error } = useData(
                  `api/user/notifications/${currentUser?.id}`
                );
                if (isLoading) {
                  return (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  );
                }
                if (error) {
                  return <p>error</p>;
                }
                return (
                  <div className="flex flex-col gap2">
                    {data.length === 0 ? <p>Have no notifications</p> : null}

                    {data.map((notif: any) => (
                      <Link
                        key={notif.id}
                        href={"/trips"}
                        className={`hover:bg-[#f1f5f9] hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="flex flex-row gap-2">
                          <div className="w-[40px] h-10 relative">
                            <Image
                              alt="Avatar"
                              fill
                              sizes="100%"
                              style={{ objectFit: "cover" }}
                              quality={100}
                              src={notif.guestImage || `/placeholder.jpg`}
                              className="rounded-full aspect-square"
                            />
                          </div>
                          <div className="flex w-[150px] flex-col gap-1">
                            <p className="font-semibold text-neutral-800 ">
                              {notif.guestName}
                            </p>
                            <p className="font-semibold text-neutral-800 ">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                );
              }}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
