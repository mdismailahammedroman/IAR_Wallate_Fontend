/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useBlockUnblockUserMutation,
  useFetchUsersQuery,
} from "@/redux/features/auth/auth.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // ShadCN input
import { Skeleton } from "@/components/ui/skeleton"; // <-- Import Skeleton
import { toast } from "sonner";
import { useState } from "react";

const UserManagement = () => {
  const { data, isLoading, error, refetch } = useFetchUsersQuery();
  const [blockUnblockUser] = useBlockUnblockUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "blocked">("all");

  const handleBlockUnblock = async (id: string, action: "block" | "unblock") => {
    try {
      await blockUnblockUser({ id, action }).unwrap();
      toast.success(`User ${action}ed successfully`);
      refetch();
    } catch (error: any) {
      toast.error(`Failed to ${action} user`, error);
    }
  };

  const allUsers = data?.data?.filter((user) => user.role === "USER") || [];

  // ✅ Apply filter and search
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filter === "all"
        ? true
        : filter === "active"
        ? user.isActive === "ACTIVE"
        : user.isActive === "BLOCKED";

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {/* 🔍 Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <Input
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2"
        />

        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "blocked" ? "default" : "outline"}
            onClick={() => setFilter("blocked")}
          >
            Blocked
          </Button>
        </div>
      </div>

      {/* 🧑‍💼 User List */}

      {isLoading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li
              key={idx}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-4 w-64 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-full mt-1" />
              </div>
              <Skeleton className="h-10 w-20 rounded-md" />
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load users.</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users match your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>

                {user.isActive === "BLOCKED" && (
                  <span className="text-xs mt-1 inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    Blocked
                  </span>
                )}

                {user.isActive === "ACTIVE" && (
                  <span className="text-xs mt-1 inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>

              <Button
                variant={user.isActive === "BLOCKED" ? "secondary" : "outline"}
                onClick={() =>
                  handleBlockUnblock(
                    user._id,
                    user.isActive === "BLOCKED" ? "unblock" : "block"
                  )
                }
              >
                {user.isActive === "BLOCKED" ? "Unblock" : "Block"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManagement;
