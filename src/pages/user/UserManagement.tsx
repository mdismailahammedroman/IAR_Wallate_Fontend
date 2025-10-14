/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBlockUnblockUserMutation, useFetchUsersQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";



const UserManagement = () => {
  const { data, isLoading, isError } = useFetchUsersQuery(undefined);
  const [blockUnblockUser] = useBlockUnblockUserMutation();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  const handleBlockUnblock = async (id: string, isBlocked: boolean) => {
    try {
      await blockUnblockUser({ id, action: isBlocked ? "unblock" : "block" }).unwrap();
    } catch (error:any) {
      toast("Failed to update user status",error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((user: any) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isActive}</td>
              <td>
                <button
                  onClick={() => handleBlockUnblock(user._id, user.isActive === "BLOCKED")}
                >
                  {user.isActive === "BLOCKED" ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
