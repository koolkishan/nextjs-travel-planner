"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Actions = ({ deleteCookie }: { deleteCookie: () => Promise<void> }) => {
  useEffect(() => {
    deleteCookie();
    redirect("/");
  }, [deleteCookie]);
  return null;
};

export default Actions;
