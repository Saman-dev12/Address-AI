import { format } from "date-fns";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const date = payload[0].payload.createdAt;
  const total = payload[0].payload.total;

  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-sm shadow-sm border overflow-hidden">
        <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
          {format(date, "MMM dd, yyyy")}
        </div>
        <hr className="mx-2" />
        <div className="p-2 px-3 space-y-1">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-blue-500 rounded-full" />
              <p className="text-sm text-muted-foreground">Addresses</p>
            </div>
            <p className="text-sm text-right font-medium">{total}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
