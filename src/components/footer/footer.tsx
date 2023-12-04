"use client";
import React from "react";
import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});
const Footer = () => {
  const router = useRouter();
  return (
    <footer className="min-h-[20vh] px-48 py-10 border-t-1 border-gray-300 grid grid-cols-4 gap-20">
      <div>
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image src="/logo.png" alt="logo" height={80} width={80} />
          <span className="text-xl uppercase font-medium italic">
            <span className={ArchitectsDaughter.className}>ARKLYTE</span>
          </span>
        </div>
        <p>
          Explore seamlessly curated tours with our all-in-one travel app.
          Effortlessly discover, compare, and book flights, hotels, and tours
          for your next adventure, powered by Next.js.
        </p>
      </div>
      <div className="flex flex-col gap-3 pt-10">
        <h3 className="text-3xl font-medium">Destinations</h3>
        <ul className="flex flex-col gap-1">
          <li>USA</li>
          <li>India</li>
          <li>France</li>
          <li>United Kingdom</li>
        </ul>
      </div>
      <div className="flex flex-col gap-3 pt-10">
        <h3 className="text-3xl font-medium">Adventures</h3>
        <ul className="flex flex-col gap-1">
          <li>Extreme</li>
          <li>In the air</li>
          <li>Nature and Wildlife</li>
          <li>Winter Sports</li>
          <li>Outdoor Parks</li>
          <li>Water Sports</li>
        </ul>
      </div>
      <div className="flex flex-col gap-3 pt-10">
        <h3 className="text-3xl font-medium">Get in Touch</h3>
      </div>
    </footer>
  );
};

export default Footer;
