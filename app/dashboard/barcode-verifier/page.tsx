import React from "react";
import Barcode from "./components/barcode";
import ResponsiveContainer from "@/components/responsive-container";

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
