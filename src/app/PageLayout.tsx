"use client";
import React from "react";
import { useDisclosure } from "@nextui-org/react";
import { AuthModal } from "@/components/auth-modal";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ScrapingLoader from "@/components/loaders/scraping-loader";
import { useAppStore } from "@/store";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isScraping } = useAppStore();
  return (
    <main className="flex flex-col min-h-[100vh] ">
      {isScraping && <ScrapingLoader />}
      <Navbar onOpen={onOpen} />
      <section className="bg-[#f5f5fe] h-full flex-1">{children}</section>
      <AuthModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <Footer />
    </main>
  );
};

export default PageLayout;
