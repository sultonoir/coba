"use client";
import React from "react";
import Container from "../shared/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeAdminNotif, SafeUserNotif } from "@/types";
import AdminMenu from "../admin/AdminMenu";
import { Navlink } from "../admin/Navlink";
import { NavItem } from "@/types";
import { adminNav } from "@/types";
import useLoginModal from "@/hooks/useLoginModal";
import { SearchIcon } from "lucide-react";
import useSearchModal from "@/hooks/useSearchModal";

interface navbarProps {
  currentUser: SafeUserNotif | null;
  admin: SafeAdminNotif | null;
}

const navbar: React.FC<navbarProps> = ({ currentUser, admin }) => {
  const loginModal = useLoginModal();
  const searchModal = useSearchModal();
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex gap-2 items-center">
              <Logo />
              {currentUser && <Navlink items={NavItem} />}
              {admin && <Navlink items={adminNav} />}
              {!currentUser && !admin && <Navlink items={NavItem} />}
            </div>
            {admin && <AdminMenu admin={admin} />}
            {currentUser && <UserMenu currentUser={currentUser} />}
            {!currentUser && !admin && (
              <div className="flex flex-row gap-5">
                <button
                  onClick={searchModal.onOpen}
                  title="Search"
                  className="sm:hidden p-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <SearchIcon size={20} />
                </button>
                <button
                  className="px-2 py-1 bg-rose-500 text-white hover:bg-rose-600 active:scale-90 transition rounded-lg"
                  onClick={loginModal.onOpen}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default navbar;
