"use client";
import React from "react";
import { useDisclosure } from "@nextui-org/react";
import { AuthModal } from "@/components/auth-modal";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ScrapingLoader from "@/components/loaders/scraping-loader";
import { useAppStore } from "@/store";
import { usePathname } from "next/navigation";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isScraping } = useAppStore();
  const pathName = usePathname();
  return (
    <>
      {pathName.includes("/admin") ? (
        children
      ) : (
        <div className=" relative flex flex-col" id="app-container">
          {/* <div className="fixed  dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-20 ">
            <img
              src="/gradients/docs-left.png"
              className="relative z-60 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
              alt="docs left background"
              data-loaded="true"
            />
          </div>
          <div className="fixed  dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
            <img
              src="/gradients/docs-right.png"
              className="relative z-60 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
              alt="docs right background"
              data-loaded="true"
            />
          </div> */}

          <main className=" flex flex-col  relative">
            {isScraping && <ScrapingLoader />}
            <Navbar onOpen={onOpen} />
            <section className=" h-full flex-1 ">{children}</section>
            <AuthModal
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
            />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
};

export default PageLayout;
