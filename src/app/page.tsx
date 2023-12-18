"use client";

import { Benefits } from "@/components/home/benefits";
import { Featured } from "@/components/home/featured";
import { Search } from "@/components/home/search";
import { Suggestions } from "@/components/home/suggestions";

import React from "react";

const Home = () => {
  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <Search />
      <Featured />
      <Benefits />
      <Suggestions />
    </div>
  );
};

export default Home;
