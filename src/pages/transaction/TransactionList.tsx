/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import {
  useMemo,
  useState
} from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const TransactionList = () => {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const [filters, setFilters] = useState({
  role: "all",
  transactionType: "all",
  status: "all",
  search: "",
  minAmount: "",
  maxAmount: "",
});


  const [page, setPage] = useState(1);
  const limit = 10;

  const clearAllFilters = () => {
    setFilters({
      role: "all",
      transactionType: "all",
      status: "all",
      search: "",
       minAmount: "",
  maxAmount: "",
    });
    setFromDate(undefined);
    setToDate(undefined);
    setPage(1);
  };

 const queryFilters = useMemo(() => {
  const q: any = {
    ...(filters.role !== "all" && { role: filters.role }),
    ...(filters.transactionType !== "all" && { transactionType: filters.transactionType }),
    ...(filters.status !== "all" && { status: filters.status }),
    ...(filters.search && { search: filters.search }),
    ...(filters.minAmount && { minAmount: Number(filters.minAmount) }),
    ...(filters.maxAmount && { maxAmount: Number(filters.maxAmount) }),
    ...(fromDate && toDate && {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    }),
    page,
    limit,
  };
  return q;
}, [filters, fromDate, toDate, page]);


  const {
    data: response,
    isLoading,
  } = useGetAllTransactionsQuery(queryFilters, {
    refetchOnMountOrArgChange: true,
  });

  const transactions = Array.isArray(response?.data) ? response.data : [];
  const totalCount = (response as any)?.total ?? 0; // fallback if typing is incorrect
  const totalPages = Math.ceil(totalCount / limit);

  const handleInput = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };
  console.log("Query Filters:", response);
if (isLoading) {
    return    <div className="flex items-center justify-center h-screen">
            <Spinner className="size-8" />

    </div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">All Transactions</h1>

      {/* Filters */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 mb-6 filter-form">

        <Input
          placeholder="Search name/email/phone"
          value={filters.search}
          onChange={(e) => handleInput("search", e.target.value)}
        />
          <Input
    placeholder="Min Amount"
    type="number"
    value={filters.minAmount}
    onChange={(e) => handleInput("minAmount", e.target.value)}
  />
  <Input
    placeholder="Max Amount"
    type="number"
    value={filters.maxAmount}
    onChange={(e) => handleInput("maxAmount", e.target.value)}
  />
  <Select onValueChange={(val) => handleInput("status", val)} value={filters.status}>
    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="COMPLETED">Completed</SelectItem>
      <SelectItem value="PENDING">Pending</SelectItem>
      <SelectItem value="FAILED">Failed</SelectItem>
    </SelectContent>
  </Select>

        <Select onValueChange={(val) => handleInput("role", val)} value={filters.role}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="AGENT">Agent</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val) => handleInput("transactionType", val)}
          value={filters.transactionType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="SEND">Send Money</SelectItem>
            <SelectItem value="ADD">Add Money</SelectItem>
            <SelectItem value="WITHDRAW">Withdraw</SelectItem>
            <SelectItem value="CASH_IN">Cash In</SelectItem>
            <SelectItem value="CASH_OUT">Cash Out</SelectItem>
          </SelectContent>
        </Select>

        {/* From Date */}
        <Popover open={fromOpen} onOpenChange={setFromOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between font-normal">
              {fromDate ? format(fromDate, "dd MMM yyyy") : "From date"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={(date) => {
                setFromDate(date);
                setFromOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {/* To Date */}
        <Popover open={toOpen} onOpenChange={setToOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between font-normal">
              {toDate ? format(toDate, "dd MMM yyyy") : "To date"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={(date) => {
                setToDate(date);
                setToOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Button onClick={clearAllFilters} variant="outline" className="w-full">
          Clear All Filters
        </Button>
      </div>

      {/* Transactions Table */}
      {isLoading ? (
        <div className="overflow-x-auto rounded-md border mb-4">
          <table className="min-w-full text-sm text-left">
         <thead className="bg-gray-100 dark:bg-gray-600 dark:text-black">

              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-t">
                  {Array.from({ length: 6 }).map((_, colIdx) => (
                    <td key={colIdx} className="p-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border mb-4">
            <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-600 dark:text-black">

                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any) => (
                  <tr key={tx._id} className="border-t hover:bg-gray-300 hover:text-gray-800">
                    <td className="p-3">{format(new Date(tx.createdAt), "dd MMM yyyy")}</td>
                    <td className="p-3">
                      {tx.initiatedByUser?.name || tx.initiatedByAgent?.name || "N/A"}
                    </td>
                    <td className="p-3">{tx.transactionType?.replace("_", " ") || "N/A"}</td>
                    <td className="p-3">${tx.amount}</td>
                    <td className="p-3">
                      {tx.fromUser?.name || tx.fromAgent?.name || "N/A"}
                    </td>
                    <td className="p-3">
                      {tx.toUser?.name || tx.toAgent?.name || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionList;
