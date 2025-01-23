import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./pages/_common_component/Header";
import Footer from "./pages/_common_component/Footer";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
