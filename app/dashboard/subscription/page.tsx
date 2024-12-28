import React from "react";
import SubscribeCards from "./components/SubscribeCards";
import ResponsiveContainer from "@/components/responsive-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address-AI | Subscription",
  description:
    "Explore Address-AI subscription plans. Choose the plan that suits your needs and unlock advanced address correction features.",
};

function Subscription() {
  return (
    <>
      <ResponsiveContainer
        heading={"Subscriptions"}
        description="Pricing plans for our service"
      >
        <SubscribeCards />
      </ResponsiveContainer>
    </>
  );
}

export default Subscription;
