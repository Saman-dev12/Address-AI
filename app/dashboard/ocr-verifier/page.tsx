import React from "react";
import OCRV from "./components/OCR";
import ResponsiveContainer from "@/components/responsive-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address-AI | OCR-Verification",
  description:
    "Extract and correct postal addresses from images using OCR technology on the Address-AI platform.",
};

function OCRVerifier() {
  return (
    <ResponsiveContainer
      heading="OCR Verifier"
      description="Verify addresses using OCR"
    >
      <OCRV />
    </ResponsiveContainer>
  );
}

export default OCRVerifier;
