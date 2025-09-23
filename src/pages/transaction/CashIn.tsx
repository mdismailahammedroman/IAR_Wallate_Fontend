
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";


const cashInSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  source: z.string().min(3, "Source is required"),
});

type CashInForm = z.infer<typeof cashInSchema>;

export const CashIn = () => {


  const form = useForm<CashInForm>({
    resolver: zodResolver(cashInSchema),
    defaultValues: { amount: 0, source: "" },
  });

  const onSubmit = async (
    // data: CashInForm
) => {
    // try {
    //   const res = await cashIn(data).unwrap();
    //   if (res.success) {
    //     toast.success("Cash in successful!");
    //     form.reset();
    //   }
    // } catch (error: any) {
    //   toast.error(error?.data?.message || "Cash in failed");
    // }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Cash In</h2>
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
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="Source of cash (e.g. bank)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
        //  type="submit" disabled={isLoading}
          className="w-full">
          {/* {isLoading ? "Processing..." : "Cash In"} */}
        </Button>
      </form>
    </div>
  );
};
