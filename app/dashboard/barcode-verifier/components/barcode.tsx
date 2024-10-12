"use client";

import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, Upload, Camera } from "lucide-react";
import {
  BrowserMultiFormatReader as BrowserMultiFormatReader2,
  NotFoundException,
} from "@zxing/library";

export default function BarcodeScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const stopDecoding = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (stopDecoding.current) {
        stopDecoding.current();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExtractedText(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload an image file first.");
      return;
    }

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
          setExtractedText(null);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const [scannerControls, setScannerControls] =
    useState<IScannerControls | null>(null);

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

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Barcode Information Extractor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or PDF (MAX. 10MB)
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
            </label>
            {file && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                File selected: {file.name}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isScanning}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Extract Information
              </>
            )}
          </Button>
        </form>

        <div className="mt-4">
          <Button
            onClick={isScanning ? stopBarcodeScanning : startBarcodeScanning}
            className="w-full"
            disabled={!codeReader.current}
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
        </div>

        {isScanning && (
          <div className="mt-4">
            <video ref={videoRef} className="w-full" />
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        {extractedText && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Extracted Information:
            </h3>
            <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap dark:bg-gray-800 dark:text-gray-200">
              {extractedText}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
