/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import animationData from "../../assets/lottie/Wallet.json";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Password from "../ui/Password";
import { toast } from "sonner";
import Lottie from "react-lottie";
import { useUserRegisterMutation, useAgentRegisterMutation } from "@/redux/features/auth/auth.api";
import type { IRegisterPayload } from "@/types";

// ✅ Removed role from schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  role: "USER" | "AGENT";
  className?: string;
}

export function RegisterForm({ role, className }: RegisterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRegister] = useUserRegisterMutation();
  const [agentRegister] = useAgentRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);

    const userInfo: IRegisterPayload = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      role, // ✅ use role from props
    };

    try {
      if (role === "AGENT") {
        await agentRegister(userInfo).unwrap();
      } else {
        await userRegister(userInfo).unwrap();
      }
      toast.success("User created successfully");
      navigate("/verify", { state: data.email });
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error("Registration failed: " + error.data.message);
      } else {
        toast.error("Registration failed, please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gray-100 flex items-center justify-center px-4 ${className}`}
    >
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden sm:flex-col-reverse">
        <div className="w-full md:w-1/2 p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-indigo-700"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {role === "AGENT" ? "Register as Agent" : "Register as User"}
          </motion.h2>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </FormProvider>

          <p className="text-center text-sm mt-4 text-gray-800">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-indigo-600">
              Log In
            </Link>
          </p>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 bg-indigo-50 items-center justify-center p-8">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
      </div>
    </motion.div>
  );
}
