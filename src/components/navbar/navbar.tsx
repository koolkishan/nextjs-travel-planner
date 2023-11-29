import React from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.jsx";

const Navbar = () => {
  return (
    <NextNavbar isBordered>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">Sentora</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Flights
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Hotels
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Tours
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
