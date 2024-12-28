import React from "react";
import Barcode from "./components/barcode";
import ResponsiveContainer from "@/components/responsive-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address-AI | Barcode-Verifier",
  description:
    "Scan and upload postal addresses using QR codes or barcodes. Simplify address retrieval with Address-AI.",
};

function OCRVerifier() {
  return (
    <ResponsiveContainer
      heading="Barcode Address"
      description="Retrieve addresses from barcodes and verify it."
    >
      <Barcode />
    </ResponsiveContainer>
  );
}

export default OCRVerifier;
