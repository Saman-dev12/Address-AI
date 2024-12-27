import { cva, VariantProps } from "class-variance-authority";
import { IconType } from "react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { Skeleton } from "@/components/ui/skeleton";

const boxVariant = cva("rounded-md p-3 shrink-0", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-4", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  title: string;
  value?: number;
  icon: IconType;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value = 0,
  icon: Icon,
  variant,
}) => {
  return (
    <Card className="lg:border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between py-2 pt-4">
        <CardTitle className="text-xl font-medium tracking-wide">
          {title}
        </CardTitle>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent className="py-2 pt-1">
        <h1 className="font-bold text-xl mb-2 ">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
          />
        </h1>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="borer-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shrink-0 h-10 w-24 mb-2" />
        <Skeleton className="shrink-0 h-4 w-40" />
      </CardContent>
    </Card>
  );
};
