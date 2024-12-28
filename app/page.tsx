import LandingPage from "@/components/Slash";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address-AI",
  description:
    "Discover Address-AI, the AI-powered solution for correcting postal addresses. Ensure accurate deliveries with OCR, bulk correction, live map visualization, and QR/barcode support.",
};

function Main() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default Main;
