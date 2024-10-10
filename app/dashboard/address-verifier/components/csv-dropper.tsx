"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const CSVDropper = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="border-purple-500 border rounded-2xl h-96 mt-12 shadow-lg flex flex-col items-center justify-center">
      <Image
        src="/tool-upload.jpg"
        alt="CSV File"
        width={100}
        height={100}
        className="h-32 w-32 hover:cursor-pointer"
        onClick={(e) => inputRef.current?.click()}
      />
      <h3 className="text-xl">Drag and drop CSV file here</h3>
      <input type="file" accept=".csv" hidden ref={inputRef} />
      <p className="my-3 text-slate-400 text-lg">Or</p>
      <Button onClick={(e) => inputRef.current?.click()}>
        <Plus className="size-4 mr-2" />
        Browse here
      </Button>
    </div>
  );
};

export default CSVDropper;
