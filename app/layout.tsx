import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getNotifications from "@/components/actions/getNotifications";
import RegisterModal from "@/components/modal/RegisterModal";
import LoginModal from "@/components/modal/LoginModal";
import RentModal from "@/components/modal/RentModal";
import ToasterProvider from "@/providers/ToasterProvider";
import getAdmin from "@/components/actions/getAdmin";
import SearchModal from "@/components/modal/SearchModal";
import HeroModal from "@/components/modal/HeroModal";
import getListings from "@/components/actions/getListings";
import ReservationModal from "@/components/modal/ReservationModal";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const notifications = await getNotifications({ userId: currentUser?.id });
  const admin = await getAdmin();
  const listings = await getListings({ adminId: admin?.id });
  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/svg+xml"
        href="/logo.svg"
      />
      <body className={inter.className}>
        <SearchModal />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <HeroModal />
        <Navbar
          currentUser={currentUser}
          notifications={notifications}
          admin={admin}
        />
        <ReservationModal listings={listings} />
        <ToasterProvider />
        <div className="py-[100px]">{children}</div>
      </body>
    </html>
  );
}
