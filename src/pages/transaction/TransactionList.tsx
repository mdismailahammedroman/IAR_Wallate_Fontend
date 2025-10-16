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
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // You can allow user to change this too

  const clearAllFilters = () => {
    setFilters({
      role: "all",
      transactionType: "all",
      status: "all",
      search: "",
    });
    setFromDate(undefined);
    setToDate(undefined);
    setPage(1); // reset to first page
  };

  const queryFilters = useMemo(() => ({
    ...(filters.role !== "all" && { role: filters.role }),
    ...(filters.transactionType !== "all" && { transactionType: filters.transactionType }),
    ...(filters.search && { search: filters.search }),
    ...(fromDate && toDate && {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    }),
    page,
    limit,
  }), [filters.role, filters.transactionType, filters.search, fromDate, toDate, page]);

  const {
  data: response,
  isLoading,
} = useGetAllTransactionsQuery(queryFilters, {
  refetchOnMountOrArgChange: true,
});

const transactions = Array.isArray(response?.data) ? response.data : [];
const totalCount = response?.total ?? 0;
const totalPages = Math.ceil(totalCount / limit);

  const handleInput = (key: string, value: string) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      return next;
    });
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">All Transactions</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 mb-6">
        <Input
          placeholder="Search name/email/phone"
          value={filters.search}
          onChange={(e) => handleInput("search", e.target.value)}
        />

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
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-t-gray-500 border-gray-300 rounded-full animate-spin" />
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border mb-4">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
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
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{format(new Date(tx.createdAt), "dd MMM yyyy")}</td>
                    <td className="p-3">
                      {tx.initiatedByUser?.name ||
                        tx.initiatedByAgent?.name ||
                        "N/A"}
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
