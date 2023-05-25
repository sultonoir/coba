"use client";
import React from "react";
import Container from "../shared/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import {
  SafeAdmin,
  SafeNotifications,
  SafeReservation,
  SafeUser,
} from "@/types";
import Categories from "./Categories";
import AdminMenu from "../admin/AdminMenu";
import Button from "../shared/Button";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Navlink } from "../admin/Navlink";
import { NavItem } from "@/types";
import { adminNav } from "@/types";

interface navbarProps {
  currentUser: SafeUser | null;
  notifications: SafeNotifications[];
  admin: SafeAdmin | null;
}

const navbar: React.FC<navbarProps> = ({
  currentUser,
  notifications,
  admin,
}) => {
  const registerModal = useRegisterModal();
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
            {admin && <AdminMenu admin={admin} />}
            {currentUser && (
              <UserMenu
                currentUser={currentUser}
                notifications={notifications}
              />
            )}
            {!currentUser && !admin && (
              <div className="w-5">
                <Button onClick={registerModal.onOpen} />
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default navbar;
