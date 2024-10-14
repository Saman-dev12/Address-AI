"use client";

import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Loader2,
  Upload,
  Camera,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  BrowserMultiFormatReader as BrowserMultiFormatReader2,
  NotFoundException,
} from "@zxing/library";
import Image from "next/image";
import EditableText from "../../../../components/editable-text";
import { useInputAddressStore, useOutputAddressStore } from "@/zustand/address";
import { useSingleAddress } from "@/features/apis/use-single-address";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BarcodeScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const stopDecoding = useRef<(() => void) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [scannerControls, setScannerControls] =
    useState<IScannerControls | null>(null);

  const router = useRouter();

  const { data } = useSession();

  const { setInputAddress } = useInputAddressStore();
  const { setOutputAddress } = useOutputAddressStore();

  const singleAddressQuery = useSingleAddress(data?.user?.email!);

  useEffect(() => {
    return () => {
      if (stopDecoding.current) {
        stopDecoding.current();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setExtractedText(null);
      setError(null);
      setIsScanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload an image file first.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageSrc = e.target?.result as string;
      if (imageSrc) {
        try {
          const codeReader = new BrowserMultiFormatReader2();
          const result = await codeReader.decodeFromImage(undefined, imageSrc);
          setExtractedText(result.getText());
          setError(null);
        } catch (err) {
          if (err instanceof NotFoundException) {
            setError("No barcode found in the image.");
          } else {
            setError("Error decoding barcode.");
          }
          setExtractedText("");
        }
      }
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const startBarcodeScanning = async () => {
    setIsScanning(true);
    setError(null);

    try {
      const videoInputDevices =
        await BrowserMultiFormatReader.listVideoInputDevices();
      if (videoInputDevices.length === 0) {
        setError("No camera devices found.");
        setIsScanning(false);
        return;
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const codeReaderInstance = new BrowserMultiFormatReader();
        codeReader.current = codeReaderInstance;

        const controls = await codeReaderInstance.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              setExtractedText(result.getText());
              stopBarcodeScanning();
            } else if (err && !(err instanceof NotFoundException)) {
              console.error(err);
              setError("Error during barcode scanning.");
            }
          }
        );

        setScannerControls(controls);
      } else {
        setError("Video reference is not available.");
      }
    } catch (err) {
      console.error("Error starting barcode scanning:", err);
      setError("Failed to start barcode scanning. Please try again.");
      setIsScanning(false);
    }
  };

  const stopBarcodeScanning = () => {
    if (scannerControls) {
      scannerControls.stop();
      setScannerControls(null);
    }

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  };

  const handleCancel = () => {
    setFile(null);
    setImageUrl(null);
    setExtractedText(null);
    setError(null);
    stopBarcodeScanning();
  };

  const [initialExtractedText, setInitialExtractedText] = useState<
    string | null
  >(null);

  const handleContinue = () => {
    singleAddressQuery.mutate(
      {
        address: extractedText! || initialExtractedText!,
      },
      {
        onSuccess: (data) => {
          if ("corrected_address" in data) {
            setOutputAddress(data.corrected_address);
            setInputAddress(extractedText! || initialExtractedText!);
            router.push("/dashboard/address-verifier/map");
          }
        },
      }
    );
  };

  return (
    <Card className="w-full mx-auto border border-purple-500 shadow-lg p-4">
      <CardContent>
        {isScanning ? (
          <div>
            <div className="flex mb-3 justify-between items-center">
              <Button
                type="button"
                onClick={stopBarcodeScanning}
                className="mr-2"
                disabled={isLoading}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
            <video ref={videoRef} className="w-full" />
            <div className="flex mt-3 justify-between items-center">
              <Button
                type="button"
                onClick={stopBarcodeScanning}
                className="mr-2"
                disabled={isLoading}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {file && (
              <div className="flex flex-col items-center gap-2 justify-end">
                <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Extract Text
                      </>
                    )}
                  </Button>
                </div>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Uploaded"
                    width={100}
                    height={100}
                    className="w-full h-64 object-contain border rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                  />
                )}
              </div>
            )}

            {!file && (
              <div className="w-full h-80 flex flex-col items-center justify-center rounded-lg">
                <Image
                  src="/barcode-logo.jpg"
                  alt="Upload Image"
                  width={100}
                  height={100}
                  className="h-32 w-32 hover:cursor-pointer"
                  onClick={() => inputRef.current?.click()}
                />
                <p className="mb-2 text-xl text-gray-950 dark:text-gray-400">
                  Drop, Upload or Paste Image
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF
                </p>
                <p className="my-3 text-slate-400 text-lg">Or</p>
                <div className="flex items-center flex-col lg:flex-row justify-center gap-3">
                  <Button
                    onClick={startBarcodeScanning}
                    className="w-auto"
                    disabled={isLoading || isScanning}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Stop Scanning
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Start Barcode Scanning
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                  >
                    <Plus className="size-4 mr-2" />
                    Browse here
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        <Input
          id="file-upload"
          type="file"
          ref={inputRef}
          hidden
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf"
        />

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        {extractedText && (
          <div>
            <EditableText
              text={extractedText}
              onSave={(newText) => {
                setExtractedText(newText);
                setInitialExtractedText(newText);
              }}
            />
            <div className="flex items-center justify-end mt-4">
              <Button onClick={handleContinue}>
                Continue
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
