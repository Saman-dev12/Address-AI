import getCurrentUser from "@/actions/getCurrentUser";
import { DataCard } from "@/app/dashboard/components/data-card";
import { redirect } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import DataChart from "./components/data-charts";
import ResponsiveContainer from "@/components/responsive-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address-AI | Overview",
  description:
    "Get an overview of your Address-AI activity, including the total number of addresses verified and interactive charts for insights.",
};

const DashboardPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  return (
    <ResponsiveContainer
      heading="Overview"
      description="Analytics for your verified addresses"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <DataCard
          title="Remaining"
          icon={FaPiggyBank}
          value={user.remaining_verified_address}
          variant="danger"
        />
        <DataCard
          title="Verified"
          icon={FaArrowTrendDown}
          value={user.used_verified_address}
          variant="success"
        />
        <DataCard
          title="Max Allowed"
          icon={FaArrowTrendUp}
          value={user.max_verified_address}
          variant="default"
        />
      </div>
      <div className="mt-5">
        <DataChart user={user} />
      </div>
    </ResponsiveContainer>
  );
};

// export const DataCardLoading = () => {
//   return (
//     <Card className="borer-none drop-shadow-sm h-[192px]">
//       <CardHeader className="flex flex-row items-center justify-between gap-x-4">
//         <div className="space-y-2">
//           <Skeleton className="h-6 w-24" />
//           <Skeleton className="h-4 w-40" />
//         </div>
//         <Skeleton className="size-12" />
//       </CardHeader>
//       <CardContent>
//         <Skeleton className="shrink-0 h-10 w-24 mb-2" />
//         <Skeleton className="shrink-0 h-4 w-40" />
//       </CardContent>
//     </Card>
//   );
// };

export default DashboardPage;
