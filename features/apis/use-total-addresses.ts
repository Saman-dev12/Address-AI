import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useTotalAddresses = (email: string) => {
  return useQuery({
    queryKey: ["total-addresses", email],
    queryFn: async () => {
      const res = await client.api[":email"]["total-addresses"].$get({
        param: { email },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch total addresses");
      }

      const { data } = await res.json();
      return data;
    },
  });
};
