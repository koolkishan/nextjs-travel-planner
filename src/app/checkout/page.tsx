"use client";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./components/stripe-form";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe("pk_test_xeqIPdYS2PpKbHmKG4gJqpde");

const Page = () => {
  const [clientSecret, setClientSecret] = useState("");

  const searchParams = useSearchParams();

  const client_secret = searchParams.get("client_secret");

  useEffect(() => {
    if (client_secret) {
      setClientSecret(client_secret);
    }
  }, [client_secret]);

  return (
    <div className="min-h-[80vh]">
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <StripeForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Page;
