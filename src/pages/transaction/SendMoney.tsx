/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchUsersQuery, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useSendMoneyMutation } from "@/redux/features/transaction/transaction.api";


interface ISendMoneyForm {
  amount: number;
  receiverId: string;
}

export const SendMoney = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<{ _id: string; name: string } | null>(null);

  const { data: userData, isLoading: authLoading } = useUserInfoQuery();

  const { data: searchData, isLoading: userSearchLoading } = useSearchUsersQuery(
    { name: searchTerm, roles: ["user", "agent"] },
    { skip: searchTerm.length < 2 }
  );

  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ISendMoneyForm>();

  useEffect(() => {
    if (selectedUser) {
      setValue("receiverId", selectedUser._id);
      setSearchTerm(selectedUser.name);
    }
  }, [selectedUser, setValue]);

  // ✅ Early returns come AFTER all hooks
  if (authLoading) {
    return <p className="text-center mt-4">Checking authentication...</p>;
  }

  if (!userData?.data) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">You must be logged in to access this page.</p>
      </div>
    );
  }
  const currentUserId = userData?.data?._id;


  const onSubmit = async (data: ISendMoneyForm) => {
    if (!selectedUser) {
      toast.error("Please select a user from the search results.");
      return;
    }

    if (selectedUser._id === currentUserId) {
      toast.error("You cannot send money to your own account.");
      return;
    }

    try {
      const response = await sendMoney({
        receiverId: selectedUser._id,
        amount: data.amount,
      }).unwrap();

      toast.success(response.message || "Money sent successfully!");
      reset();
      setSelectedUser(null);
      setSearchTerm("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send money.");
    }
  };

  return (

    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Search Field */}
          <div>
            <Label>Search User</Label>
            <Input
              placeholder="Type to search users by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedUser(null);
              }}
            />

            {/* User Not Found */}
            {searchTerm.length >= 2 &&
              !selectedUser &&
              !userSearchLoading &&
              (searchData?.data?.length ?? 0) === 0 && (
                <p className="text-sm text-red-500 mt-1">No users found.</p>
              )}

            {/* Search Suggestions */}
            {searchTerm.length >= 2 &&
              !selectedUser &&
              (searchData?.data?.length ?? 0) > 0 && (
                <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto mt-1">
                  {searchData?.data
                    ?.filter((user) => user._id !== currentUserId)
                    .map((user) => (
                      <li
                        key={user._id}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        onClick={() => setSelectedUser(user)}
                      >
                        {user.name} ({user.email})
                      </li>
                    ))}

                </ul>
              )}
          </div>

          {/* Amount Field */}
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Sending..." : "Send Money"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
