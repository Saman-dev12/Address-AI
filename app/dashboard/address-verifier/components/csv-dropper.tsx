"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
// import { useDropzone } from "react-dropzone";
import { useCSVReader } from "react-papaparse";

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

interface CSVDropperProps {
  onUpload: (results: typeof INITIAL_IMPORT_RESULTS) => void;
  isLoading: boolean;
}

const CSVDropper: React.FC<CSVDropperProps> = ({ onUpload, isLoading }) => {
  const { CSVReader } = useCSVReader();
  const inputRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="border-purple-500 border rounded-2xl h-96 mt-8 shadow-lg flex flex-col items-center justify-center bg-white">
      <Image
        src="/tool-upload.jpg"
        alt="CSV File"
        width={100}
        height={100}
        className="h-32 w-32 hover:cursor-pointer"
        onClick={(e) => inputRef.current?.click()}
      />
      <h3 className="text-xl">Drag and drop CSV file here</h3>
      <p className="my-3 text-slate-400 text-lg">Or</p>
      <CSVReader onUploadAccepted={(results: any) => onUpload(results)}>
        {({ getRootProps }: any) => (
          <Button disabled={isLoading} ref={inputRef} {...getRootProps()}>
            <Plus className="size-4 mr-2" />
            Browse here
          </Button>
        )}
      </CSVReader>
    </div>
  );
};

export default CSVDropper;
