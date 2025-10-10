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
    useWithdrawMoneyMutation,
} from "@/redux/features/transaction/transaction.api";
import { useLocation } from "react-router";

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
    const currentUserId = userData?.data?._id;

    const shouldSkip = searchTerm.length < 2 || (type !== "send" && type !== "withdraw");

    const { data: searchData, isLoading: userSearchLoading } = useSearchUsersQuery(
        { name: searchTerm, roles: ["user", "agent"] },
        { skip: shouldSkip }
    );

    const [sendMoney, { isLoading: sending }] = useSendMoneyMutation();
    const [addMoney, { isLoading: adding }] = useAddMoneyMutation();
    const [withdrawMoney, { isLoading: withdrawing }] = useWithdrawMoneyMutation();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IMoneyForm>();

    useEffect(() => {
        if (selectedUser && (type === "send" || type === "withdraw")) {
            setValue("receiverId", selectedUser._id);
            setSearchTerm(selectedUser.name);
        }
    }, [selectedUser, setValue, type]);

    useEffect(() => {
    setTransactionSummary(null);
    reset(); // reset form fields
    setSelectedUser(null);
    setSearchTerm("");
}, [location.pathname, reset]);


    if (authLoading) return <p className="text-center mt-4">Checking authentication...</p>;

    if (!userData?.data) {
        return <div className="text-center mt-4 text-red-500">You must be logged in to use this feature.</div>;
    }

    const onSubmit = async (formData: IMoneyForm) => {
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
                    amount: formData.amount,
                }).unwrap();

                const tx = response?.data?.transaction;
                const amount = tx?.amount || formData.amount;

                setTransactionSummary({
                    type,
                    transactionId: tx?.transactionId || "N/A",
                    createdAt: tx?.createdAt || null,
                    amount,
                    sender: tx?.fromUser || userData.data,
                    receiver: tx?.toUser || tx?.toAgent || selectedUser,
                    senderPrevBalance: response.data.newSenderBalance - amount,
                    senderNewBalance: response.data.newSenderBalance,
                    receiverPrevBalance: response.data.newReceiverBalance - amount,
                    receiverNewBalance: response.data.newReceiverBalance,
                });
            }

            if (type === "add") {
                response = await addMoney({ amount: formData.amount }).unwrap();

                const tx = response?.transaction || {};
                const amount = tx?.amount ?? formData.amount;
                const newBalance = response?.balance ?? null;
                const transactionId = tx?.transactionId ?? "N/A";
                const createdAt = tx?.createdAt ?? null;

                setTransactionSummary({
                    type,
                    transactionId,
                    createdAt,
                    amount,
                    sender: userData.data,
                    senderPrevBalance: newBalance - amount,
                    senderNewBalance: newBalance,
                });

                return;
            }

            if (type === "withdraw") {
                  if (!selectedUser) {
                    toast.error("Please select a user from the search results.");
                    return;
                }

                if (selectedUser._id === currentUserId) {
                    toast.error("You cannot withdraw to your own account.");
                    return;
                }
                if (!formData.amount || formData.amount <= 0) {
                    toast.error("Please enter a valid amount.");
                    return;
                }

                response = await withdrawMoney({
                    amount: formData.amount,
                    agentId: selectedUser._id,
                }).unwrap();

                const tx = response?.data?.transaction;
                const amount = tx?.amount || formData.amount;

                setTransactionSummary({
                    type,
                    transactionId: tx?.transactionId || "N/A",
                    createdAt: tx?.createdAt || null,
                    amount,
                    sender: tx?.fromUser || userData.data,
                    receiver: tx?.toAgent || selectedUser,
                    senderPrevBalance: response.data.userBalance - amount,
                    senderNewBalance: response.data.userBalance,
                    receiverPrevBalance: response.data.agentBalance - amount,
                    receiverNewBalance: response.data.agentBalance,
                });
            }

            toast.success(response.message || "Transaction successful!");
            reset();
            setSelectedUser(null);
            setSearchTerm("");
        } catch (error: any) {
            console.error("Transaction error:", error);
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
        <Card className="w-full lg:max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>{renderTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                {!transactionSummary ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {(type === "send" || type === "withdraw") && (
                            <div>
                                <Label>{type === "send" ? "Search User" : "Search Agent (by name or email)"}</Label>
                                <Input
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setSelectedUser(null);
                                    }}
                                />

                                {/* Show selected user/agent */}
                                {selectedUser && (
                                    <p className="text-sm text-green-600 mt-1">
                                        ✅ Selected: {selectedUser.name} ({selectedUser.email}){" "}
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="text-xs text-red-500"
                                            onClick={() => {
                                                setSelectedUser(null);
                                                setSearchTerm("");
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </p>
                                )}

                                {/* Show results */}
                                {searchTerm.length >= 2 && !selectedUser && !userSearchLoading && (searchData?.data?.length ?? 0) === 0 && (
                                    <p className="text-sm text-red-500 mt-1">No matches found.</p>
                                )}

                                {searchTerm.length >= 2 && !selectedUser && (searchData?.data?.length ?? 0) > 0 && (
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
                                <p><strong>Transaction ID:</strong> {transactionSummary.transactionId}</p>
                                <p><strong>Date:</strong> {transactionSummary.createdAt ? new Date(transactionSummary.createdAt).toLocaleString() : "N/A"}</p>
                                <p><strong>Amount:</strong> ${transactionSummary.amount}</p>
                            </div>

                            <div>
                                <p><strong>Sender:</strong> {transactionSummary.sender?.name}</p>
                                <p><strong>Sender Email:</strong> {transactionSummary.sender?.email}</p>
                                <p><strong>Sender Previous Balance:</strong> ${transactionSummary.senderPrevBalance ?? "N/A"}</p>
                                <p><strong>Sender Current Balance:</strong> ${transactionSummary.senderNewBalance ?? "N/A"}</p>
                            </div>

                            {transactionSummary.receiver && type !== "add" && (
                                <div>
                                    <p><strong>Receiver:</strong> {transactionSummary.receiver?.name} ({transactionSummary.receiver?.email})</p>
                                    {transactionSummary.receiverPrevBalance && (
                                        <p><strong>Receiver Previous Balance:</strong> ${transactionSummary.receiverPrevBalance}</p>
                                    )}
                                    {transactionSummary.receiverNewBalance && (
                                        <p><strong>Receiver Current Balance:</strong> ${transactionSummary.receiverNewBalance}</p>
                                    )}
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
