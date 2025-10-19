/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useUserInfoQuery, useSearchUsersQuery } from "@/redux/features/auth/auth.api";
import {
    useSendMoneyMutation,
    useAddMoneyMutation,
    useWithdrawMoneyMutation,
    useCashInMutation,
    useCashOutMutation,
} from "@/redux/features/transaction/transaction.api";
import { useLocation } from "react-router";
import { toast } from "sonner";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";



type TransactionType = "send" | "add" | "withdraw" | "cashin" | "cashout";

interface IMoneyForm {
    amount: number;
    receiverId?: string;  // for selecting user/agent
}

interface Props {
    type: TransactionType;
}

// Validate only for cashin / cashout
const validateTransaction = ({
    type,
    selectedUser,
    currentUserId,
    amount,
}: {
    type: TransactionType;
    selectedUser: { _id: string; name?: string; email?: string } | null;
    currentUserId: string | undefined;
    amount: number | undefined;
}): string | null => {
    if (type === "cashin" || type === "cashout") {
        if (!selectedUser || !selectedUser._id) {
            return "Agent ID / User ID is required.";
        }
        if (!amount || amount <= 0) {
            return "Valid amount is required.";
        }
        if (selectedUser._id === currentUserId) {
            return "You cannot transact with your own account.";
        }
    } else {
        // For other types, at least validate amount
        if (!amount || amount <= 0) {
            return "Valid amount is required.";
        }
    }
    return null;
};

export const MoneyTransactionForm = ({ type }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<{ _id: string; name: string; email: string } | null>(null);
    const [transactionSummary, setTransactionSummary] = useState<any>(null);

    const { data: userData, isLoading: authLoading } = useUserInfoQuery();
    const currentUserId = userData?.data?._id;

    // Only search when needed
    const shouldSkip = searchTerm.length < 2 || !["send", "add", "withdraw", "cashin", "cashout"].includes(type);


    const { data: searchData, isLoading: userSearchLoading } = useSearchUsersQuery(
        { name: searchTerm, roles: ["user", "agent"] },
        { skip: shouldSkip }
    );

    const [sendMoney, { isLoading: sending }] = useSendMoneyMutation();
    const [addMoney, { isLoading: adding }] = useAddMoneyMutation();
    const [withdrawMoney, { isLoading: withdrawing }] = useWithdrawMoneyMutation();
    const [cashIn, { isLoading: cashingIn }] = useCashInMutation();
    const [cashOut, { isLoading: cashingOut }] = useCashOutMutation();
    const { refetch: refetchWallet } = useMyWalletQuery();

    const location = useLocation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IMoneyForm>({ mode: "onChange" });

    useEffect(() => {
        if (selectedUser && ["send", "addmony", "withdraw", "cashin", "cashout"].includes(type)) {
            setValue("receiverId", selectedUser._id);
            setSearchTerm(selectedUser.name);
        }
    }, [selectedUser, setValue, type]);

    useEffect(() => {
        // Reset form when navigating or transaction completed
        setTransactionSummary(null);
        reset();
        setSelectedUser(null);
        setSearchTerm("");
    }, [location.pathname, reset]);

    if (authLoading) {
        return (
            <Card className="w-full lg:max-w-xl mx-auto p-6 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-1/2" />
            </Card>
        );
    }
    if (!userData?.data) {
        return <div className="text-center mt-4 text-red-500">You must be logged in to use this feature.</div>;
    }

    const onSubmit = async (formData: IMoneyForm) => {
        // Run our custom validation first
        const validationError = validateTransaction({
            type,
            selectedUser,
            currentUserId,
            amount: formData.amount,
        });
        if (validationError) {
            toast.error(validationError);
            return;
        }

        try {
            let response: any;

            if (type === "cashin") {
                response = await cashIn({
                    userId: selectedUser!._id,  // Assuming your backend expects agentId
                    amount: formData.amount,
                }).unwrap();
            } else if (type === "cashout") {
                response = await cashOut({
                    userId: selectedUser!._id,
                    amount: formData.amount,
                }).unwrap();
            } else if (type === "send") {
                // your existing logic for send
                if (!selectedUser) {
                    toast.error("Please select a user from the search results.");
                    return;
                }
                response = await sendMoney({
                    receiverId: selectedUser._id,
                    amount: formData.amount,
                }).unwrap();
            }
            else if (type === "add") {
                if (!selectedUser) {
                    toast.error("Please select an agent from the search results.");
                    return;
                }

                response = await addMoney({
                    amount: formData.amount,
                    agentId: selectedUser._id,
                }).unwrap();
            }
            else if (type === "withdraw") {
                if (!selectedUser) {
                    toast.error("Please select a user from the search results.");
                    return;
                }
                response = await withdrawMoney({
                    agentId: selectedUser._id,
                    amount: formData.amount,
                }).unwrap();
            }
              await refetchWallet()
            // Extract transaction & balances from response
            // Adjust this to match your backend response structure
            const tx = response?.data?.transaction || response?.transaction || {};
            const amount = tx?.amount || formData.amount;

            setTransactionSummary({
                type,
                transactionId: tx?.transactionId || "N/A",
                createdAt: tx?.createdAt || null,
                amount,
                sender: tx?.fromUser || userData.data,
                receiver: tx?.toUser || tx?.toAgent || selectedUser,
                senderPrevBalance:
                    response?.data?.newSenderBalance
                        ? response.data.newSenderBalance - amount
                        : null,
                senderNewBalance:
                    response?.data?.newSenderBalance || response?.balance,
                receiverPrevBalance:
                    response?.data?.newReceiverBalance
                        ? response.data.newReceiverBalance - amount
                        : null,
                receiverNewBalance: response?.data?.newReceiverBalance,
            });

            toast.success(response.message || "Transaction successful!");
            reset();
            setSelectedUser(null);
            setSearchTerm("");
        } catch (error: any) {
            console.error("Transaction error:", error);
            toast.error(error?.data?.message || "Transaction failed.");
        }
    };

    const loading = sending || adding || withdrawing || cashingIn || cashingOut;
    const renderTitle = {
        send: "Send Money",
        add: "Add Money",
        withdraw: "Withdraw Money",
        cashin: "Cash In",
        cashout: "Cash Out",
    }[type];

    return (
        <Card className="w-full lg:max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>{renderTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                {!transactionSummary ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {(type === "send" ||  type === "add" || type === "withdraw" || type === "cashin" || type === "cashout") && (
                            <div>
                                <Label className="m-1">{type === "send" ? "Search Agent or User":"Search User" }</Label>
                                <Input
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setSelectedUser(null);
                                    }}
                                />

                                {/* ✅ Selected user */}
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

                                {/* ✅ Skeleton loading for user search */}
                                {userSearchLoading && !selectedUser && (
                                    <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto mt-1 z-10 relative space-y-2 p-2">
                                        {[...Array(3)].map((_, i) => (
                                            <li key={i}>
                                                <Skeleton className="h-4 w-3/4" />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* No matches */}
                                {searchTerm.length >= 2 &&
                                    !selectedUser &&
                                    !userSearchLoading &&
                                    (searchData?.data?.length ?? 0) === 0 && (
                                        <p className="text-sm text-red-500 mt-1">No matches found.</p>
                                    )}

                                {/* Result list */}
                                {searchTerm.length >= 2 &&
                                    !selectedUser &&
                                    (searchData?.data?.length ?? 0) > 0 && (
                                        <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto mt-1 z-10 relative">
                                            {searchData?.data
                                                ?.filter((user) => user._id !== currentUserId)
                                                .map((user) => (
                                                    <li
                                                        key={user._id}
                                                        className="cursor-pointer px-3 py-2 hover:bg-gray-200 dark:bg-gray-700"
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
                            <Label className="m-1">Amount</Label>
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
