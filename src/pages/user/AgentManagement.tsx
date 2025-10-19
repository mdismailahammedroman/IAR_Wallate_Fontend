/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useFetchAgentsQuery,
  useBlockUnblockUserMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const AgentManagement = () => {
  const { data: agentsData, isLoading, error, refetch } = useFetchAgentsQuery();
  const [blockUnblockUser] = useBlockUnblockUserMutation();
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "suspended" | "blocked">("all");

  if (isLoading) {
      return    <div className="flex items-center justify-center h-screen">
              <Spinner className="size-8" />
  
      </div>
    }


  const handleBlockUnblock = async (id: string, action: "block" | "unblock") => {
    try {
      await blockUnblockUser({ id, action }).unwrap();
      toast.success(`Agent ${action}ed successfully`);
      refetch();
    } catch {
      toast.error(`Failed to ${action} agent`);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveAgent(id).unwrap();
      toast.success("Agent approved");
      refetch();
    } catch {
      toast.error("Failed to approve agent");
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await suspendAgent(id).unwrap();
      toast.success("Agent suspended");
      refetch();
    } catch {
      toast.error("Failed to suspend agent");
    }
  };

  const allAgents = agentsData?.data || [];

  const filteredAgents = allAgents.filter((agent: any) => {
    const matchesSearch =
      agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filter === "all"
        ? true
        : filter === "blocked"
        ? agent.isActive === "BLOCKED"
        : agent.userStatus === filter.toUpperCase();

    return matchesSearch && matchesStatus;
  });


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Agent Management</h1>

      {/* 🔍 Search + Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-6">
        <Input
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2"
        />

        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {["all", "approved", "pending", "suspended", "blocked"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status as any)}
              className="text-sm capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li key={idx} className="p-4 border rounded flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-20 mt-2" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className="text-center text-red-500">Error loading agents.</p>
      ) : filteredAgents.length === 0 ? (
        <p className="text-center text-gray-500">No agents found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredAgents.map((agent: any) => {
            const isBlocked = agent.isActive === "BLOCKED";
            const userStatus = agent.userStatus;

            return (
              <li
                key={agent._id}
                className="p-4 border rounded flex flex-col sm:flex-row justify-between sm:items-center gap-4"
              >
                <div className="flex-1">
                  <p className="font-semibold text-base">{agent.name}</p>
                  <p className="text-sm text-gray-500">{agent.email}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {userStatus && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full 
                          ${
                            userStatus === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : userStatus === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : userStatus === "SUSPENDED"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {userStatus}
                      </span>
                    )}
                    {isBlocked && (
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                        Blocked
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleBlockUnblock(agent._id, isBlocked ? "unblock" : "block")
                    }
                  >
                    {isBlocked ? "Unblock" : "Block"}
                  </Button>

                  {(userStatus === "PENDING" || userStatus === "SUSPENDED") && (
                    <Button size="sm" variant="secondary" onClick={() => handleApprove(agent._id)}>
                      Approve
                    </Button>
                  )}

                  {userStatus === "APPROVED" && (
                    <Button size="sm" variant="destructive" onClick={() => handleSuspend(agent._id)}>
                      Suspend
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AgentManagement;
