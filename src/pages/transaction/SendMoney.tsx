/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { toast } from "sonner";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
// import { Button } from "../ui/button";

const sendMoneySchema = z.object({
  recipient: z.string().min(3, "Recipient is required"),
  amount: z.number().min(1, "Amount must be greater than zero"),
  note: z.string().optional(),
});

type SendMoneyForm = z.infer<typeof sendMoneySchema>;

export const SendMoney = () => {
//   const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const form = useForm<SendMoneyForm>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: { recipient: "", amount: 0, note: "" },
  });

  const onSubmit = async (
    // data: SendMoneyForm
) => {
    // try {
    //   const res = await sendMoney(data).unwrap();
    //   if (res.success) {
    //     toast.success("Money sent successfully!");
    //     form.reset();
    //   }
    // } catch (error: any) {
    //   toast.error(error?.data?.message || "Failed to send money");
    // }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Send Money</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input placeholder="Recipient email or username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Amount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Sending..." : "Send"}
        </Button> */}
      </form>
    </div>
  );
};
