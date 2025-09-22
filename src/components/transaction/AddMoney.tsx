
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";



const addMoneySchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
});

type AddMoneyForm = z.infer<typeof addMoneySchema>;

export const AddMoney = () => {
//   const [addMoney, { isLoading }] = useAddMoneyMutation();

  const form = useForm<AddMoneyForm>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: { amount: 0 },
  });

  const onSubmit = async (
    // data: AddMoneyForm
) => {
    // try {
    //   const res = await addMoney(data).unwrap();
    //   if (res.success) {
    //     toast.success("Money added successfully!");
    //     form.reset();
    //   }
    // } catch (error: any) {
    //   toast.error(error?.data?.message || "Failed to add money");
    // }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Add Money</h2>
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
        <Button type="submit" 
        // disabled={isLoading}
         className="w-full">
          {/* {isLoading ? "Adding..." : "Add Money"} */}
        </Button>
      </form>
    </div>
  );
};
