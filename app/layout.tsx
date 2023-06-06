import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import getCurrentUser from "@/components/actions/getCurrentUser";
import RegisterModal from "@/components/modal/RegisterModal";
import LoginModal from "@/components/modal/LoginModal";
import RentModal from "@/components/modal/RentModal";
import ToasterProvider from "@/providers/ToasterProvider";
import getAdmin from "@/components/actions/getAdmin";
import SearchModal from "@/components/modal/SearchModal";
import HeroModal from "@/components/modal/HeroModal";
import ReservationModal from "@/components/modal/ReservationModal";
import getListingAdmin from "@/components/actions/getlListingsAdmin";
import getNotifications from "@/components/actions/getNotifications";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "KyOuka Hotel",
  description:
    "KyOuka adalah platform daring yang memungkinkan orang untuk menyewakan properti atau kamar tidur mereka kepada wisatawan atau tamu yang mencari tempat menginap sementara. Dengan menggunakan KyOuka, pemilik properti dapat mempromosikan ruang mereka, menetapkan harga, dan menyediakan informasi tentang fasilitas yang tersedia. Di sisi lain, para pengguna KyOuka dapat mencari dan memesan akomodasi sesuai dengan preferensi mereka, baik untuk liburan, perjalanan bisnis, atau tujuan lainnya.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const admin = await getAdmin();
  const listings = await getListingAdmin({ adminId: admin?.id });
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
          admin={admin}
        />
        <ReservationModal listings={listings} />
        <ToasterProvider />
        <div className="py-[100px]">{children}</div>
      </body>
    </html>
  );
}
