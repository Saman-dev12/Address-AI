import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["address"]["bulk-address"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["address"]["bulk-address"]["$post"]
>["json"];

export const useBulkAddress = (email: string) => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api[":email"]["address"][
        "bulk-address"
      ].$post({
        json: json,
        param: {
          email,
        },
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error || "Failed to verify addresses");
      }

      const responseData = await response.json();

      return responseData;
    },
    onSuccess: (_data) => {
      toast.success("Addresses verified successfully");
      // queryClient.invalidateQueries({queryKey:["get-addresses",email]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
