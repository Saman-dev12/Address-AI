"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  useBulkInputAddressesStore,
  useBulkOutputAddressesStore,
  useInputAddressStore,
  useOutputAddressStore,
} from "@/zustand/address";
import { ArrowRight, Download } from "lucide-react";
import { useRouter } from "next/navigation";

const OutputAddressesClient = () => {
  const router = useRouter();
  const { inputAddresses } = useBulkInputAddressesStore();
  const { outputAddresses } = useBulkOutputAddressesStore();
  const { setInputAddress } = useInputAddressStore();
  const { setOutputAddress } = useOutputAddressStore();

  console.log(outputAddresses);
  return (
    <Card className="bg-white border-purple-500">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Formatted Addresses
        </CardTitle>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/dashboard/address-verifier");
              router.refresh();
            }}
          >
            Restart
          </Button>
          <Button className="w-full lg:w-auto">
            <Download className="size-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Input Address</TableHead>
              <TableHead className="text-left">Output Address</TableHead>
              <TableHead className="text-left">Pincode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inputAddresses?.map((address, index) => {
              if (outputAddresses && outputAddresses[index]) {
                let changed =
                  address.toLowerCase() ==
                  outputAddresses[index].corrected_address.toLowerCase()
                    ? false
                    : true;

                const regex = /\b\d{6}\b/;
                const match =
                  outputAddresses[index].corrected_address.match(regex);
                const predictedpincode = match ? match[0] : null;

                const match2 = address.match(regex);
                const originalPincode = match2 ? match2[0] : null;

                changed = predictedpincode !== originalPincode ? true : false;

                const danger = predictedpincode == null ? true : false;

                return (
                  <TableRow
                    key={index}
                    className={cn(
                      changed ? "bg-green-100" : "",
                      danger ? "bg-red-100" : "",
                      "capitalize"
                    )}
                  >
                    <TableCell>{address}</TableCell>
                    <TableCell>
                      {outputAddresses[index].corrected_address}
                    </TableCell>
                    <TableCell>
                      {predictedpincode}
                      {danger && (
                        <span className="text-rose-500">
                          {" "}
                          (Invalid or Incomplete Address)
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        onClick={() => {
                          setInputAddress(address);
                          setOutputAddress(outputAddresses[index]);
                          router.push("/dashboard/address-verifier/map");
                          router.refresh();
                        }}
                      >
                        See on Map <ArrowRight className="size-4 ml-2" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OutputAddressesClient;
