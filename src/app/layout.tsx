import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ibpseudo.com",
  description: "All things IB Pseudocode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full justify-center">
          <div className="flex justify-center flex-col border-0 border-green-600 lg:w-3/4 md:w-3/4 sm:w-full">
            <NavBar />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
