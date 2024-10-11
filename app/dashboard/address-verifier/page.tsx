"use client";
import { useState } from "react";
import CSVDropper from "./components/csv-dropper";
import ImportCard from "./components/import-card";

type VARIANT = "UPLOAD" | "IMPORT";

const AddressVerifierPage = () => {
  const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
  };

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
    console.log(values);
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
