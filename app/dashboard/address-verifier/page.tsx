import ResponsiveContainer from "@/components/responsive-container";
import AddressVerifierPage from "./components/address-verifier";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address-AI | Verifier",
  description:
    "Correct postal addresses effortlessly with Address-AI. Input addresses individually or upload CSV files for bulk verification.",
};

const AddressVerifier = () => {
  return (
    <ResponsiveContainer
      heading="Address Verification"
      description="Verify and correct addresses in bulk"
    >
      <AddressVerifierPage />
    </ResponsiveContainer>
  );
};

export default AddressVerifier;
