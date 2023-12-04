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
} from "@nextui-org/react";
import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const Navbar = ({ onOpen }) => {
  const router = useRouter();
  const { userInfo } = useAppStore();
  return (
    <NextNavbar isBordered>
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
        <NavbarItem>
          <Link color="foreground" href="/search-flights">
            Flights
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/search-hotels" aria-current="page">
            Hotels
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/search-tours">
            Tours
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!userInfo && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Button}
                color="primary"
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
                  color="priamry"
                  name={userInfo.firstName}
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
    </NextNavbar>
  );
};

export default Navbar;
