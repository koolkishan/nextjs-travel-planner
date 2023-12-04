import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import AppProtector from "./app-protector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARKLYTE",
  description: "Your travel companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <AppProtector />
          {children}
        </Providers>
      </body>
    </html>
  );
}
