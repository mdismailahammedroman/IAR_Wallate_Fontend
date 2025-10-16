import {
  useFetchUsersQuery,
  useFetchAgentsQuery,
  useBlockUnblockUserMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/auth/auth.api";

const ManageUsersAndAgents = () => {
  // Fetch data
  const { data: usersData, isLoading: usersLoading, error: usersError } = useFetchUsersQuery();
  const { data: agentsData, isLoading: agentsLoading, error: agentsError } = useFetchAgentsQuery();

  // Mutations
  const [blockUnblockUser, { isLoading: blockLoading }] = useBlockUnblockUserMutation();
  const [approveAgent, { isLoading: approveLoading }] = useApproveAgentMutation();
  const [suspendAgent, { isLoading: suspendLoading }] = useSuspendAgentMutation();

  if (usersLoading || agentsLoading) return <p className="text-center py-10">Loading...</p>;
  if (usersError) return <p className="text-center py-10 text-red-600">Error loading users.</p>;
  if (agentsError) return <p className="text-center py-10 text-red-600">Error loading agents.</p>;

  // Handlers
  const handleBlockUnblock = async (id: string, isBlocked: boolean) => {
    await blockUnblockUser({ id, action: isBlocked ? "unblock" : "block" });
  };

  const handleApprove = async (id: string) => {
    await approveAgent(id);
  };

  const handleSuspend = async (id: string) => {
    await suspendAgent(id);
  };

  return (
    <div className="container mx-auto p-6 space-y-10">
      {/* Users Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>
        {usersData?.data?.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {usersData.data.map((user) => (
              <li
                key={user._id}
                className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md"
              >
                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-1 text-xs uppercase text-gray-400">User</p>
                <p className="mt-2 font-semibold">
                  Status:{" "}
                  <span className={user.isBlocked ? "text-red-600" : "text-green-600"}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </p>
                <button
                  onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                  disabled={blockLoading}
                  className={`mt-3 px-4 py-2 rounded text-white ${
                    user.isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </section>

      {/* Agents Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Manage Agents</h2>
        {agentsData?.data?.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {agentsData.data.map((agent) => (
              <li
                key={agent._id}
                className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md"
              >
                <p className="text-lg font-medium">{agent.name}</p>
                <p className="text-sm text-gray-600">{agent.email}</p>
                <p className="mt-1 text-xs uppercase text-gray-400">Agent</p>

                <p className="mt-2 font-semibold">
                  Status:{" "}
                  {agent.isApproved ? (
                    <span className="text-green-600">Approved</span>
                  ) : (
                    <span className="text-yellow-600">Pending Approval</span>
                  )}
                  {" | "}
                  {agent.isSuspended ? (
                    <span className="text-red-600">Suspended</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </p>

                {!agent.isApproved && (
                  <button
                    onClick={() => handleApprove(agent._id)}
                    disabled={approveLoading}
                    className="mt-3 mr-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Approve
                  </button>
                )}

                {!agent.isSuspended ? (
                  <button
                    onClick={() => handleSuspend(agent._id)}
                    disabled={suspendLoading}
                    className="mt-3 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={() => handleSuspend(agent._id)}
                    disabled={suspendLoading}
                    className="mt-3 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Unsuspend
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No agents found.</p>
        )}
      </section>
    </div>
  );
};

export default ManageUsersAndAgents;
