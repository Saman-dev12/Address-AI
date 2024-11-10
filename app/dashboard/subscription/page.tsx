import React from "react";
import SubscribeCards from "./components/SubscribeCards";
import ResponsiveContainer from "@/components/responsive-container";

function Subscription() {
  return (
    <>
      <ResponsiveContainer heading={"Subscriptions"} description="">
        <SubscribeCards />
      </ResponsiveContainer>
    </>
  );
}

export default Subscription;
