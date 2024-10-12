import React from "react";
import OCRV from "./components/OCR";
import ResponsiveContainer from "@/app/responsive-container";

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
