/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSendMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { useForm } from "react-hook-form";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { ISendMoneyPayload } from "@/types/transaction.types";

export const SendMoney = () => {
  const [SendMoney] = useSendMoneyMutation()
   const { data: sendUser, isLoading, isError } = useUserInfoQuery();
     const user = sendUser?.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISendMoneyPayload>();

const onSubmit = async (data: ISendMoneyPayload) => {
  console.log("Submitted data:", data);
  
  if (!user?._id) {
    toast.error('User ID is missing.');
    return;
  }

  try {
    const response = await SendMoney(data).unwrap();
    console.log(response);

    toast.success(response.message || "Money sent successfully!");
    // optionally reset the form here if needed
    // reset();
  } catch (error: any) {
    console.error("Send money error:", error);
    toast.error(error?.data?.message || "Something went wrong.");
  }
};

   if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>SendMoney faild</p>;
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-indigo-700 dark:text-indigo-400">
          Send Money
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              placeholder="Recipient email or username"
              {...register("receiverId", { required: "Recipient is required" })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
             {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
            })}

            />
          </div>

        

          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
