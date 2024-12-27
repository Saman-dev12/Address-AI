"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { companySchema } from "@/db/schema";
import { useTotalAddresses } from "@/features/apis/use-total-addresses";
import { FileSearch, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";
import { AreaVariant } from "./area-variant";

interface DataChartProps {
  user: z.infer<typeof companySchema>;
}

const DataChart: React.FC<DataChartProps> = ({ user }) => {
  const totalAddressesQuery = useTotalAddresses(user.email);

  const isLoading = totalAddressesQuery.isPending;

  const data = totalAddressesQuery.data || [];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <ChartLoading />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-wide">
              Verified Addresses
            </CardTitle>
          </CardHeader>
          <CardContent className=" pt-3">
            {data.length == 0 ? (
              <div className="flex flex-col gap-4 items-center justify-center h-[350px] w-full">
                <FileSearch className="size-6 text-muted-foreground" />
                <p>No data for this period</p>
              </div>
            ) : (
              <AreaVariant data={data} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const ChartLoading = () => {
  return (
    <Card className="drop-shadow-sm border-none">
      <CardHeader className="flex space-y-2 lg:flex-row lg:space-y-0 lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent className="h-[350px] w-full flex items-center justify-center">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </CardContent>
    </Card>
  );
};

export default DataChart;
