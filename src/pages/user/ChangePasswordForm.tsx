/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/user/ChangePasswordForm.tsx

import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
   if (isLoading) {
      return    <div className="flex items-center justify-center h-screen">
              <Spinner className="size-8" />
  
      </div>
    }

  const onSubmit = async (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.newPassword
      }).unwrap();
      toast.success("Password changed successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password.");
    }
  };
 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <div>
        <Input
          type="password"
          placeholder="Old Password"
          {...register("oldPassword", { required: "Old password is required" })}
        />
        {errors.oldPassword && (
          <p className="text-sm text-red-500">{errors.oldPassword.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="New Password"
          {...register("newPassword", { required: "New password is required" })}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Confirm New Password"
          {...register("confirmPassword", {
            required: "Please confirm your new password",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Changing..." : "Change Password"}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
