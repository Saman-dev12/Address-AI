"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CSVDropper from "./components/csv-dropper";
import ImportCard from "./components/import-card";
import ResponsiveContainer from "@/components/responsive-container";
import { useBulkAddress } from "@/features/apis/use-bulk-addresses";
import { useSingleAddress } from "@/features/apis/use-single-address";
import {
  useBulkInputAddressesStore,
  useBulkOutputAddressesStore,
  useInputAddressStore,
  useOutputAddressStore,
} from "@/zustand/address";

type VARIANT = "UPLOAD" | "IMPORT";

const addressSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
});

const AddressVerifierPage = () => {
  const INITIAL_IMPORT_RESULTS = { data: [], errors: [], meta: {} };
  const { data } = useSession();
  const router = useRouter();

  const { setOutputAddresses } = useBulkOutputAddressesStore();
  const { setInputAddresses } = useBulkInputAddressesStore();
  const { setOutputAddress } = useOutputAddressStore();
  const { setInputAddress } = useInputAddressStore();

  const bulkAddressQuery = useBulkAddress(data?.user?.email!);
  const singleAddressQuery = useSingleAddress(data?.user?.email!);

  const [variant, setVariant] = useState<VARIANT>("UPLOAD");
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: "" },
  });

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
    bulkAddressQuery.mutate(
      { addresses: values },
      {
        onSuccess(data) {
          if ("corrected_addresses" in data) {
            setOutputAddresses(data.corrected_addresses);
            router.push("/dashboard/address-verifier/results");
          }
        },
        onError(error) {
          console.error("ERROR:", error);
        },
      }
    );
  };

  const handleSingleAddressSubmit = (values: { address: string }) => {
    singleAddressQuery.mutate(
      { address: values.address },
      {
        onSuccess: (data) => {
          if ("corrected_address" in data) {
            setOutputAddress(data.corrected_address);
            setInputAddress(values.address);
            router.push("/dashboard/address-verifier/map");
          }
        },
      }
    );
  };

  return (
    <ResponsiveContainer
      heading="Address Verification"
      description="Verify and correct addresses in bulk"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSingleAddressSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-white text-black"
                    placeholder="Enter your address here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              singleAddressQuery.isPending ||
              bulkAddressQuery.isPending
            }
            className="w-full py-[22px]"
          >
            Submit
          </Button>
        </form>
      </Form>

      <h3 className="mt-7 text-center text-xl">OR</h3>
      {variant === "UPLOAD" ? (
        <CSVDropper
          onUpload={onUpload}
          isLoading={bulkAddressQuery.isPending || singleAddressQuery.isPending}
        />
      ) : (
        <ImportCard
          onCancel={onCancelImport}
          onSubmit={handleSubmitImport}
          data={importResults.data}
          isLoading={singleAddressQuery.isPending || bulkAddressQuery.isPending}
        />
      )}
    </ResponsiveContainer>
  );
};

export default AddressVerifierPage;
