/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchAgentsQuery, useApproveAgentMutation, useSuspendAgentMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";


const AgentManagement = () => {
  const { data, isLoading, isError } = useFetchAgentsQuery(undefined);
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  if (isLoading) return <p>Loading agents...</p>;
  if (isError) return <p>Error loading agents.</p>;

  const handleApprove = async (id: string) => {
    try {
      await approveAgent(id).unwrap();
    } catch (error:any) {
      toast("Failed to approve agent",error);
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await suspendAgent(id).unwrap();
    } catch (error:any) {
      toast("Failed to approve agent",error);
    }
  };

  return (
    <div>
      <h2>Agent Management</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((agent: any) => (
            <tr key={agent._id}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.userStatus}</td>
              <td>
                {agent.userStatus !== "APPROVED" && (
                  <button onClick={() => handleApprove(agent._id)}>Approve</button>
                )}
                {agent.userStatus !== "SUSPENDED" && (
                  <button onClick={() => handleSuspend(agent._id)}>Suspend</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentManagement;
