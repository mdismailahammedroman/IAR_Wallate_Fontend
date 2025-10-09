/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useUserInfoQuery, useSearchUsersQuery } from "@/redux/features/auth/auth.api";
import {
    useSendMoneyMutation,
    useAddMoneyMutation,
    useWithdrawMoneyMutation
} from "@/redux/features/transaction/transaction.api";

type TransactionType = "send" | "add" | "withdraw";

interface IMoneyForm {
    amount: number;
    receiverId?: string;
}

interface Props {
    type: TransactionType;
}

export const MoneyTransactionForm = ({ type }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<{ _id: string; name: string; email: string } | null>(null);
    const [transactionSummary, setTransactionSummary] = useState<any>(null);

    const { data: userData, isLoading: authLoading } = useUserInfoQuery();

    const { data: searchData, isLoading: userSearchLoading } = useSearchUsersQuery(
        { name: searchTerm, roles: ["user", "agent"] },
        { skip: searchTerm.length < 2 || type !== "send" }
    );

    const [sendMoney, { isLoading: sending }] = useSendMoneyMutation();
    const [addMoney, { isLoading: adding }] = useAddMoneyMutation();
    const [withdrawMoney, { isLoading: withdrawing }] = useWithdrawMoneyMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IMoneyForm>();

    useEffect(() => {
        if (selectedUser && type === "send") {
            setValue("receiverId", selectedUser._id);
            setSearchTerm(selectedUser.name);
        }
    }, [selectedUser, setValue, type]);

    if (authLoading) return <p className="text-center mt-4">Checking authentication...</p>;

    if (!userData?.data) {
        return <div className="text-center mt-4 text-red-500">You must be logged in to use this feature.</div>;
    }

    const currentUserId = userData?.data._id;

    const onSubmit = async (data: IMoneyForm) => {
        try {
            let response: any;

            if (type === "send") {
                if (!selectedUser) {
                    toast.error("Please select a user from the search results.");
                    return;
                }

                if (selectedUser._id === currentUserId) {
                    toast.error("You cannot send money to your own account.");
                    return;
                }

                response = await sendMoney({
                    receiverId: selectedUser._id,
                    amount: data.amount,
                }).unwrap();
            }
            console.log("Transaction API response:", response);

            if (type === "add") {
                response = await addMoney({ amount: data.amount }).unwrap();
            }

            if (type === "withdraw") {
                response = await withdrawMoney({ amount: data.amount }).unwrap();
            }

            toast.success(response.message || "Transaction successful!");
            setTransactionSummary({
                type,
                transactionId: response.data.transaction.transactionId,
                createdAt: response.data.transaction.createdAt,
                amount: response.data.transaction.amount,
                sender: response.data.transaction.fromUser,
                receiver: response.data.transaction.toUser,
                senderPrevBalance: response.data.newSenderBalance - response.data.transaction.amount,
                senderNewBalance: response.data.newSenderBalance,
            });



            reset();
            setSelectedUser(null);
            setSearchTerm("");
        } catch (error: any) {
            toast.error(error?.data?.message || "Transaction failed.");
        }
    };

    const loading = sending || adding || withdrawing;

    const renderTitle = {
        send: "Send Money",
        add: "Add Money",
        withdraw: "Withdraw Money",
    }[type];

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>{renderTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                {!transactionSummary ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* User Search for Send */}
                        {type === "send" && (
                            <div>
                                <Label>Search User</Label>
                                <Input
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setSelectedUser(null);
                                    }}
                                />
                                {searchTerm.length >= 2 &&
                                    !selectedUser &&
                                    !userSearchLoading &&
                                    (searchData?.data?.length ?? 0) === 0 && (
                                        <p className="text-sm text-red-500 mt-1">No users found.</p>
                                    )}

                                {searchTerm.length >= 2 &&
                                    !selectedUser &&
                                    (searchData?.data?.length ?? 0) > 0 && (
                                        <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto mt-1 z-10 relative">
                                            {searchData?.data
                                                ?.filter((user) => user._id !== currentUserId)
                                                .map((user) => (
                                                    <li
                                                        key={user._id}
                                                        className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                                                        onClick={() => setSelectedUser(user)}
                                                    >
                                                        {user.name} ({user.email})
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                            </div>
                        )}

                        {/* Amount Field */}
                        <div>
                            <Label>Amount</Label>
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: { value: 1, message: "Minimum amount is 1" },
                                })}
                            />
                            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Processing..." : renderTitle}
                        </Button>
                    </form>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-green-600 mb-2">Transaction Successful</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                             <p><strong>Transaction ID:</strong> {transactionSummary.transactionId ?? "N/A"}</p>
<p><strong>Date:</strong> {transactionSummary.createdAt ? new Date(transactionSummary.createdAt).toLocaleString() : "N/A"}</p>
<p><strong>Amount:</strong> ${transactionSummary.amount ?? "N/A"}</p>

                            </div>

                            <div>
                                <p><strong>Sender:</strong> {transactionSummary.sender.name} </p>
                                <p><strong>Sender email:</strong> ({transactionSummary.sender.email})</p>
                                <p><strong>Sender Previous Balance:</strong> ${transactionSummary.senderPrevBalance}</p>
                                <p><strong>Sender Current Balance:</strong> ${transactionSummary.senderNewBalance}</p>
                            </div>

                            {type === "send" && transactionSummary.receiver && (
                                <div>
                                    <p><strong>Receiver:</strong> {transactionSummary.receiver.name} ({transactionSummary.receiver.email})</p>
                                </div>
                            )}
                        </div>

                        <Button className="mt-4" onClick={() => setTransactionSummary(null)}>
                            New Transaction
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
};
