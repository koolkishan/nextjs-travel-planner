import { cookies } from "next/headers";
import React from "react";
import Actions from "./actions";

const Page = () => {
  async function deleteCookie() {
    "use server";
    cookies().delete("access_token");
  }

  return <Actions deleteCookie={deleteCookie} />;
};

export default Page;
