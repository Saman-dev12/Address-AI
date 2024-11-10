import {
  AreaChart,
  Tooltip,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import { format } from "date-fns";
import { CustomTooltip } from "./custom-tooltip";
import React from "react";

interface AreaVariantProps {
  data?: {
    id: string;
    total: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    companyId: string | null;
  }[];
}

export const AreaVariant: React.FC<AreaVariantProps> = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="createdAt"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: string | null) =>
            value ? format(new Date(value), "dd MMM") : ""
          }
          style={{
            fontSize: "12px",
          }}
          tickMargin={16}
        />

        <Area
          type="monotone"
          dataKey="total"
          stackId="total"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#total)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
