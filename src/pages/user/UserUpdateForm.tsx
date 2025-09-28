/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/UserUpdateForm.tsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {  useUpdateUserMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';
import type { UpdateUserPayload } from '@/types/auth.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const UserUpdateForm: React.FC = () => {
  // Fetch user info
  const { data: userRes, isLoading, isError } = useUserInfoQuery();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const user = userRes?.data;

  // Setup form
  const { register, handleSubmit, reset } = useForm<UpdateUserPayload>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      profileImage: '',
      dateOfBirth: '',
    },
  });

  // Reset form when user data loads
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        profileImage: user.profileImage || '',
        // Date of Birth: if ISO string exists, convert to YYYY-MM-DD format for <input type="date" />
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      });
    }
  }, [user, reset]);

  // Submit handler
  const onSubmit = async (formData: UpdateUserPayload) => {
    if (!user?._id) {
      toast.error('User ID is missing.');
      return;
    }
    try {
      await updateUser({ id: user._id, updateData: formData }).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile.');
    }
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <Input {...register('name')} placeholder="Name" required />
      <Input {...register('phone')} placeholder="Phone" />
      <Input {...register('address')} placeholder="Address" />
      <Input
        {...register('dateOfBirth')}
        type="date"
        placeholder="Date of Birth"
        max={new Date().toISOString().split('T')[0]}
      />
      <Input {...register('profileImage')} placeholder="Profile Image URL" />

      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};
