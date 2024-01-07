"use client";
import React from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  AvatarIcon,
} from "@nextui-org/react";
import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Navbar = ({ onOpen }: { onOpen: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo } = useAppStore();
  const routesWithImages = ["/", "/search-flights", "/search-hotels"];
  return (
    <NextNavbar
      isBordered
      className="min-h-[10vh] bg-violet-500 bg-opacity-10 text-white relative"
    >
      {!routesWithImages.includes(pathname) && (
        <>
          <div className="fixed left-0 top-0 h-[10vh] w-[100vw] overflow-hidden z-0">
            <div className="h-[70vh] w-[100vw] absolute z-10 top-0 left-0">
              <Image
                src="/home/home-bg.png"
                layout="fill"
                objectFit="cover"
                alt="Search"
              />
            </div>
          </div>
          <div
            className="fixed left-0 top-0 h-[10vh] w-[100vw] overflow-hidden z-0"
            style={{
              backdropFilter: "blur(12px) saturate(280%)",
              WebkitBackdropFilter: "blur(12px) saturate(280%)", // for Safari support
            }}
          ></div>
        </>
      )}
      <div className="z-10 w-full flex items-center">
        <NavbarBrand>
          <div
            className="cursor-pointer flex items-center"
            onClick={() => router.push("/")}
          >
            <Image src="/logo.png" alt="logo" height={80} width={80} />
            <span className="text-xl uppercase font-medium italic">
              <span className={ArchitectsDaughter.className}>ARKLYTE</span>
            </span>
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link
              href="/"
              aria-current="page"
              className={`${
                pathname === "/" ? "text-danger-500" : "text-white"
              }`}
            >
              Tours
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/search-flights"
              className={`${
                pathname.includes("flights") ? "text-danger-500" : "text-white"
              }`}
            >
              Flights
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/search-hotels"
              className={`${
                pathname.includes("hotels") ? "text-danger-500" : "text-white"
              }`}
            >
              Hotels
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {!userInfo && (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button
                  onPress={onOpen}
                  color="secondary"
                  variant="flat"
                  className="text-purple-500"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Button}
                  color="danger"
                  onPress={onOpen}
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          {userInfo && (
            <>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    icon={<AvatarIcon />}
                    classNames={{
                      base: "bg-gradient-to-br from-[#ff578f] to-[#945bff]",
                      icon: "text-black/80",
                    }}
                    // name={userInfo.firstName}
                    size="md"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  onAction={(key) => router.push(key as string)}
                >
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userInfo.email}</p>
                  </DropdownItem>
                  <DropdownItem key="/my-account">My Account</DropdownItem>
                  <DropdownItem key="/my-bookings">My Bookings</DropdownItem>
                  <DropdownItem key="/my-wishlists">Wishlist</DropdownItem>
                  <DropdownItem key="/logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </NavbarContent>
      </div>
    </NextNavbar>
  );
};

export default Navbar;
