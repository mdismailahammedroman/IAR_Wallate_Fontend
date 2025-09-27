/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useUpdateUserMutation,
  useUserInfoQuery,
  useGetAgentInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { UpdateUserPayload } from "@/types/auth.types";
import { useEffect } from "react";

export const UserUpdateForm = () => {
  const role = localStorage.getItem("role");

  // Fetch correct data based on role
  const {
    data: userRes,
    isLoading: loadingUser,
    error: userError,
  } = useUserInfoQuery(undefined, { skip: role !== "USER" });

  const {
    data: agentRes,
    isLoading: loadingAgent,
    error: agentError,
  } = useGetAgentInfoQuery(undefined, { skip: role !== "AGENT" });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const data = role === "AGENT" ? agentRes : userRes;
  const isLoading = role === "AGENT" ? loadingAgent : loadingUser;
  const error = role === "AGENT" ? agentError : userError;

  const user = data?.data;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateUserPayload>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      profileImage: "",
      dateOfBirth: "",
    },
  });

  // Populate form on data load
  useEffect(() => {
    if (user) {
      const {
        name,
        phone,
        address,
        profileImage,
        dateOfBirth,
      } = user;
      reset({ name, phone, address, profileImage, dateOfBirth });
    }
  }, [user, reset]);

  // Submit form
  const onSubmit = async (formData: UpdateUserPayload) => {
    const userId = user?._id;

    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      await updateUser({ id: userId, data: formData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (!user) return <p>No user data found.</p>;
  if (error) return <p>Error loading user data.</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <Input {...register("name")} placeholder="Name" />
      <Input {...register("phone")} placeholder="Phone" />
      <Input {...register("address")} placeholder="Address" />
      <Input {...register("dateOfBirth")} placeholder="Date of Birth" />
      <Input {...register("profileImage")} placeholder="Profile Image URL" />

      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
};
