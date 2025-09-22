
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const cashOutSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  destination: z.string().min(3, "Destination is required"),
});

type CashOutForm = z.infer<typeof cashOutSchema>;

export const CashOut = () => {
//   const [cashOut, { isLoading }] = useCashOutMutation();

  const form = useForm<CashOutForm>({
    resolver: zodResolver(cashOutSchema),
    defaultValues: { amount: 0, destination: "" },
  });

  const onSubmit = async (
    // data: CashOutForm
) => {
    // try {
    //   const res = await cashOut(data).unwrap();
    //   if (res.success) {
    //     toast.success("Cash out successful!");
    //     form.reset();
    //   }
    // } catch (error: any) {
    //   toast.error(error?.data?.message || "Cash out failed");
    // }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Cash Out</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter amount"
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
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input placeholder="Destination (e.g. bank account)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" 
        // disabled={isLoading} 
        className="w-full">
          {/* {isLoading ? "Processing..." : "Cash Out"} */}
        </Button>
      </form>
    </div>
  );
};
