/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import animationData from "../../assets/lottie/Wallet.json"; // Adjust path as needed
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Password from "../ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import Lottie from "react-lottie";


// Zod schema for validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;


export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [register] = useRegisterMutation();
  const navigate=useNavigate()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

    },
  });

  // Handle form submission
const onSubmit = async (data: RegisterFormData) => {
  setIsSubmitting(true);

const userInfo = {
  name: data.name.trim(),
  email: data.email.trim().toLowerCase(),
  password: data.password,
  confirmPassword:data.confirmPassword,
  
};


  console.log("Sending userInfo:", userInfo);

  try {
    const result = await register(userInfo).unwrap();
    console.log("Register response:", result);
    toast.success("User created successfully");
    navigate("/verify", { state: data.email }); // or any method you pick
  } catch (error: any) {
    console.error("Error during registration:", error);
    // inspect error
    if (error?.data?.message) {
      toast.error("Registration failed: " + error.data.message);
    } else {
      toast.error("Registration failed, please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
}

  // Lottie animation settings
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
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden sm:flex-col-reverse">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-indigo-700"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Create Your Wallet Account
          </motion.h2>

          {/* React Hook Form */}
          <FormProvider  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input className="text-gray-800 border-gray-300" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Your public display name.
                      </FormDescription>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className="text-gray-800 border-gray-300" placeholder="john.doe@company.com" type="email" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Your email address.
                      </FormDescription>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password className="text-gray-800 border-gray-300" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Your password.
                      </FormDescription>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password className="text-gray-800 border-gray-300" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Confirm your password.
                      </FormDescription>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </motion.div>
            </form>
          </FormProvider>

          <p className="text-center text-sm mt-4 text-gray-800">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-600 cursor-pointer">
              Log In
            </Link>
          </p>
        </div>

        {/* Animation Section */}
        <div className="w-full md:w-1/2 bg-gray-100 p-4 flex items-center justify-center">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </motion.div>
  );
}
