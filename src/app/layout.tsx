import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_common_component/Header";
import Footer from "./_common_component/Footer";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medgel Pvt. Ltd.",
  description:
    "MEDGEL, a state of art facility, for manufacturing of Soft Gel Capsules uniquely with In-line Drying Technology, one of its kind in Asia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkAdminFromCookie();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header checkAdmin={isAdmin} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
