
import {
  useBlockUnblockUserMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useFetchUsersQuery,
} from "@/redux/features/auth/auth.api";

import { Button } from "@/components/ui/button"; // assuming shadcn button

const UserManagement= () => {
  const { data: agentsData, isLoading, error } = useFetchUsersQuery();
  const [blockUnblockUser] = useBlockUnblockUserMutation();
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  if (isLoading) return <p>Loading agents...</p>;
  if (error) return <p>Error loading agents.</p>;

  const handleBlockUnblock = async (id: string, action: "block" | "unblock") => {
    try {
      await blockUnblockUser({ id, action }).unwrap();
      alert(`User ${action}ed successfully.`);
    } catch {
      alert(`Failed to ${action} user.`);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveAgent(id).unwrap();
      alert("Agent approved.");
    } catch {
      alert("Failed to approve agent.");
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await suspendAgent(id).unwrap();
      alert("Agent suspended.");
    } catch {
      alert("Failed to suspend agent.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Agent Management</h1>
      <ul className="space-y-4">
        {agentsData?.data.map((agent) => (
          <li key={agent._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{agent.name}</p>
              <p className="text-sm text-gray-500">{agent.email}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  handleBlockUnblock(agent._id, agent.isBlocked ? "unblock" : "block")
                }
              >
                {agent.isBlocked ? "Unblock" : "Block"}
              </Button>
              {!agent.isApproved && (
                <Button variant="secondary" onClick={() => handleApprove(agent._id)}>
                  Approve
                </Button>
              )}
              {agent.isApproved && (
                <Button variant="destructive" onClick={() => handleSuspend(agent._id)}>
                  Suspend
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement
