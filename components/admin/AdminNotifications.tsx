import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { GoPrimitiveDot } from "react-icons/go";
import { RxBell } from "react-icons/rx";
import { Fragment, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { pusherClient } from "@/libs/pusher";
import { Notification } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SafeAdminNotif } from "@/types";

interface AdminNotificationsProps {
  admin: SafeAdminNotif | null;
}
const AdminNotifications: React.FC<AdminNotificationsProps> = ({ admin }) => {
  const [data, setData] = useState(admin);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    pusherClient.subscribe("get");
    pusherClient.bind("newreservation", function (data: any) {
      setData(data);
    });
    pusherClient.subscribe("getR");
    pusherClient.bind("newratings", (data: any) => {
      setData(data);
    });
    pusherClient.subscribe("getT");
    pusherClient.bind("true", (data: any) => {
      setData(data);
    });
    return () => {
      pusherClient.unsubscribe("get");
      pusherClient.unbind("newreservation", function (data: any) {
        setData(data);
      });
      pusherClient.unsubscribe("getR");
      pusherClient.unbind("newratings", function (data: any) {
        setData(data);
      });
      pusherClient.unsubscribe("");
      pusherClient.unbind("true", function (data: any) {
        setData(data);
      });
    };
  }, []);

  const onGet = () => {
    setIsloading(true);
    axios
      .post(`/api/admin`, {
        notification: false,
        adminId: data?.id,
      })
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button
          onClick={onGet}
          className="p-3 border border-neutral-200 hover:shadow-md transition cursor-pointer rounded-full"
        >
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-52 overflow-y-auto">
          <div className="px-1 py-1 ">
            {data?.notifi?.length === 0 ? (
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
            ) : null}
            {data?.notifi?.map((notif: Notification) => (
              <Menu.Item key={notif.id}>
                {({ active }) => {
                  if (isloading) {
                    return (
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-[70px]" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      href={"/admin"}
                      className={`${
                        active ? "bg-[#f1f5f9] text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <div className="flex flex-row gap-2">
                        <div className="w-10 h-10">
                          <Image
                            alt="Avatar"
                            width={40}
                            height={40}
                            src={notif.guestImage || `/placeholder.jpg`}
                            className="rounded-full aspect-square"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-neutral-800 ">
                            {notif.guestName}
                          </p>
                          <hr />
                          <p className="font-semibold text-neutral-800 ">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                }}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AdminNotifications;
