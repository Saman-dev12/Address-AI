"use client";
import { useState } from "react";
import CSVDropper from "./components/csv-dropper";
import ImportCard from "./components/import-card";
import { useBulkAddress } from "./components/apis/use-bulk-addresses";
import { useSession } from "next-auth/react";

type VARIANT = "UPLOAD" | "IMPORT";

const AddressVerifierPage = () => {
  const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
  };

  const { data } = useSession();

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
    // console.log(values);
    bulkAddressQuery.mutate(
      {
        addresses: values,
      },
      {
        onSuccess(data, variables, context) {
          console.log("Data: ", data);
        },
        onError(error, variables, context) {
          console.log("ERROR:", error);
        },
      }
    );
  };

  return (
    <div className="ml-80 pt-16 pr-8">
      <h1 className="text-3xl leading-none">Address Verification</h1>
      <h2 className="text-sm text-gray-500 my-1">
        Verify and correct postal addresses with our Address-Verifier tool
      </h2>
      <hr className="mb-6" />
      {variant === "UPLOAD" ? (
        <CSVDropper onUpload={onUpload} />
      ) : (
        <ImportCard
          onCancel={onCancelImport}
          onSubmit={handleSubmitImport}
          data={importResults.data}
        />
      )}
    </div>
  );
};

export default AddressVerifierPage;
