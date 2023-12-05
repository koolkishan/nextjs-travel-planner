"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Actions = ({ deleteCookie }: any) => {
  useEffect(() => {
    deleteCookie();
    redirect("/");
  }, [deleteCookie]);
  return null;
};

export default Actions;
