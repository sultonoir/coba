"use client";
import useProfile from "@/hooks/UseProfile";
import usePassordModal from "@/hooks/usePassword";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const EditProfile = () => {
  const passowrdModal = usePassordModal();
  const profileModal = useProfile();
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button className="flex gap-2 w-20 bg-rose-500 rounded-full px-2 py-1 active:scale-90 transition text-slate-100">
          <AiOutlineEdit size={24} />
          Edit
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
        <Menu.Items className="absolute mt-2 right-0 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-secondary shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={profileModal.onOpen}
                  className={`${
                    active ? "bg-rose-500 text-white" : "text-primary"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FaUser
                    size={24}
                    className="pr-2"
                  />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={passowrdModal.onOpen}
                  className={`${
                    active ? "bg-rose-500 text-white" : "text-primary"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <MdPassword
                    size={24}
                    className="pr-2"
                  />
                  Password
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default EditProfile;
