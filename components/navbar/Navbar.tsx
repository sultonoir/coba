"use client";
import React from "react";
import Container from "../shared/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeAdmin, SafeNotifications, SafeUser } from "@/types";
import AdminMenu from "../admin/AdminMenu";
import { Navlink } from "../admin/Navlink";
import { NavItem } from "@/types";
import { adminNav } from "@/types";
import useLoginModal from "@/hooks/useLoginModal";
import useData from "@/hooks/useData";
import { Admin, Notification } from "@prisma/client";

interface navbarProps {
  currentUser: SafeUser | null;
  admin: SafeAdmin | null;
  notifi:
    | (Admin & {
        notifi: Notification[];
      })
    | null;
}

const navbar: React.FC<navbarProps> = ({ currentUser, admin, notifi }) => {
  const loginModal = useLoginModal();
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <span className="flex gap-2 items-center">
              <Logo />
              {currentUser && <Navlink items={NavItem} />}
              {admin && <Navlink items={adminNav} />}
              {!currentUser && !admin && <Navlink items={NavItem} />}
            </span>
            {admin && (
              <AdminMenu
                admin={admin}
                notifi={notifi}
              />
            )}
            {currentUser && <UserMenu currentUser={currentUser} />}
            {!currentUser && !admin && (
              <button
                className="px-2 py-1 bg-rose-500 text-white hover:bg-rose-600 active:scale-90 transition rounded-lg"
                onClick={loginModal.onOpen}
              >
                Login
              </button>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default navbar;
