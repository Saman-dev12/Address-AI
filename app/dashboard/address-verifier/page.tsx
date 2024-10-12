"use client";
import { useState } from "react";
import CSVDropper from "./components/csv-dropper";
import ImportCard from "./components/import-card";
import { useBulkAddress } from "@/features/apis/use-bulk-addresses";
import { useSession } from "next-auth/react";
import {
  useBulkInputAddressesStore,
  useBulkOutputAddressesStore,
} from "@/zustand/address";
import { useRouter } from "next/navigation";
import ResponsiveContainer from "@/app/responsive-container";

type VARIANT = "UPLOAD" | "IMPORT";

const AddressVerifierPage = () => {
  const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
  };

  const { data } = useSession();

  const router = useRouter();

  const { setOutputAddresses } = useBulkOutputAddressesStore();
  const { setInputAddresses } = useBulkInputAddressesStore();

  const bulkAddressQuery = useBulkAddress(data?.user?.email!);

  const [variant, setVariant] = useState<VARIANT>("UPLOAD");
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant("IMPORT");
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant("UPLOAD");
  };

  const handleSubmitImport = async (values: string[]) => {
    setInputAddresses(values);
    // console.log(values);
    bulkAddressQuery.mutate(
      {
        addresses: values,
      },
      {
        onSuccess(data) {
          console.log("Data: ", data);
          if ("corrected_addresses" in data) {
            setOutputAddresses(data.corrected_addresses);
            router.push("/dashboard/address-verifier/results");
          }
        },
        onError(error) {
          console.log("ERROR:", error);
        },
      }
    );
  };

  return (
    <ResponsiveContainer
      heading="Addresss Verification"
      description="Verify and correct addresses in bulk"
    >
      {variant === "UPLOAD" ? (
        <CSVDropper onUpload={onUpload} />
      ) : (
        <ImportCard
          onCancel={onCancelImport}
          onSubmit={handleSubmitImport}
          data={importResults.data}
        />
      )}
    </ResponsiveContainer>
  );
};

export default AddressVerifierPage;
