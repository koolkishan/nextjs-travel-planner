"use client";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    const updateOrderInfo = async () => {
      await apiClient.patch(USER_API_ROUTES.CREATE_BOOKING, {
        paymentIntent,
      });
    };
    if (paymentIntent) {
      updateOrderInfo();
      setTimeout(() => router.push("/my-bookings"), 3000);
    }
  }, [router, paymentIntent]);

  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the bookings page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  );
};

export default Page;
