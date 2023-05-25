import { SafeNotifications, SafeUser } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { RxBell } from "react-icons/rx";
import { GoPrimitiveDot } from "react-icons/go";

interface NotificationsProps {
  notifications: SafeNotifications[];
  currentUser: SafeUser | null;
}

export default function Notifications({
  notifications,
  currentUser,
}: NotificationsProps) {
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
            {currentUser?.notification && (
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
            {notifications.length === 0 && (
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-rose-500 text-white" : "text-primary"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Tidak ada notifikasi
                  </div>
                )}
              </Menu.Item>
            )}
            {notifications.map((notif) => {
              if (notif.message === "Memberikan rating") {
                return (
                  <Menu.Item key={notif.id}>
                    {({ active }) => (
                      <Link
                        href={`/listings/${notif.listingId}`}
                        className={`${
                          active ? "bg-[#f1f5f9] text-white" : "text-primary"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="flex flex-row gap-2">
                          <span className="w-10 h-10">
                            <Image
                              alt="Avatar"
                              width={40}
                              height={40}
                              src={notif.guestImage || `/placeholder.jpg`}
                              className="rounded-full aspect-square"
                            />
                          </span>
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold text-neutral-800 ">
                              {notif.guestName}
                            </p>
                            <p className="font-semibold text-neutral-800 ">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                );
              } else {
                return (
                  <Menu.Item key={notif.id}>
                    {({ active }) => (
                      <Link
                        href={`/reservations`}
                        className={`${
                          active ? "bg-[#f1f5f9] text-white" : "text-primary"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="flex flex-row gap-2">
                          <span className="w-10 h-10">
                            <Image
                              alt="Avatar"
                              width={40}
                              height={40}
                              src={notif.guestImage || `/placeholder.jpg`}
                              className="rounded-full aspect-square"
                            />
                          </span>
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold text-neutral-800 ">
                              {notif.guestName}.{notif.message}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                );
              }
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
