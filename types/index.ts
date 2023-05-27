import {
  Listing,
  Reservation,
  User,
  Notification,
  Admin,
  Additional,
} from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
  additional: Additional[];
};

export type SafeNotifications = Omit<Notification, "createdAt"> & {
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
export type SafeAdmin = Omit<
  Admin,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export const adminNav = [
  {
    title: "Home",
    href: "/admin",
  },
  {
    title: "Reservation",
    href: "/admin/Reservation",
  },
  {
    title: "Properti",
    href: "/admin/properti",
  },
];

export const NavItem = [
  {
    title: "Home",
    href: "/Home",
  },
  {
    title: "Admin",
    href: "/admin",
  },
  {
    title: "Reservations",
    href: "/reservations",
  },
];
