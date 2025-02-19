import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["address"]["single-address"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["address"]["single-address"]["$post"]
>["json"];

export const useSingleAddress = (email: string) => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api[":email"]["address"][
        "single-address"
      ].$post({
        json: json,
        param: {
          email,
        },
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error || "Failed to verify address");
      }

      const responseData = await response.json();

      return responseData;
    },
    onSuccess: (_data) => {
      toast.success("Address verified successfully");
      // queryClient.invalidateQueries({queryKey:["get-addresses",email]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
