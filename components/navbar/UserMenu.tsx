"use client";

import { SafeUserNotif } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SlLogout } from "react-icons/sl";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../shared/Avatar";
import { MdOutlinePayments } from "react-icons/md";
import Notifications from "../shared/Notifications";
import { GoHistory } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";

interface UserMenuProps {
  currentUser: SafeUserNotif | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div className="flex flex-row items-center gap-3">
        {currentUser && <Notifications currentUser={currentUser} />}
        <Menu.Button className="p-3 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition relative">
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
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
            {currentUser ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push("/payment")}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlinePayments
                        size={24}
                        className="pr-2"
                      />
                      Paymet
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(`/reservations`)}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <GoHistory
                        size={24}
                        className="pr-2"
                      />
                      History
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(`/settings`)}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <VscSettings
                        size={24}
                        className="pr-2"
                      />
                      Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <SlLogout
                        className="pr-2"
                        size={24}
                      />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={loginModal.onOpen}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Signin
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={registerModal.onOpen}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Signup
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
