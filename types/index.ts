import { Listing, Reservation, User, Notifi, Admin } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeNotifications = Omit<Notifi, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeUserNotif = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  notifi: Notifi[];
};

export type SafeAdmin = Omit<
  Admin,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeAdminNotif = Omit<
  Admin,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  notifi: Notifi[];
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export const adminNav = [
  {
    title: "Dashboard",
    href: "/admin",
  },
];

export const NavItem = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Rooms",
    href: "/rooms",
  },
  {
    title: "Facilities",
    href: "/fasilitas",
  },
];
