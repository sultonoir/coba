"use client";

import { SafeAdmin } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import Avatar from "../shared/Avatar";
import React, { useEffect, useState } from "react";
import AdminNotifications from "./AdminNotifications";
import useData from "@/hooks/useData";
import { AiOutlineMenu } from "react-icons/ai";
import { Skeleton } from "../ui/skeleton";
import { Admin, Notification } from "@prisma/client";

interface AdminMenuProps {
  admin: SafeAdmin | null;
  notifi:
    | (Admin & {
        notifi: Notification[];
      })
    | null;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ admin, notifi }) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div className="flex flex-row gap-x-1">
        <AdminNotifications notifi={notifi} />
        <Menu.Button className="p-3 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition relative">
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={admin?.image} />
          </div>
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
        <Menu.Items className="absolute mt-2 right-0 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            {admin ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-rose-500 text-white" : "text-primary"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            ) : null}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AdminMenu;
