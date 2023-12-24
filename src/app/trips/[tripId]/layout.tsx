"use client";
import { AuthModal } from "@/components/auth-modal";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="flex flex-col min-h-[100vh]">
      <Navbar onOpen={onOpen} />
      <section className="bg-[#f5f5fe] h-full flex-1">{children}</section>
      <AuthModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <Footer />
    </main>
  );
};

export default Layout;
