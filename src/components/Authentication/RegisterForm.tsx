import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/Wallet.json"; // Adjust path as needed
import { z } from "zod";
import { Link } from "react-router";

// Zod schema
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

export const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setIsSubmitting(true);
    console.log("Registering:", data);

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Registered successfully!");
    }, 2000);
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <motion.input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Email */}
            <motion.input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password */}
            <motion.input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            {/* Confirm Password */}
            <motion.input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}

            <motion.button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-600 cursor-pointer">Log In</Link>
          </p>
        </div>

        {/* Animation Section */}
        <div className="w-full md:w-1/2 bg-gray-100 p-4 flex items-center justify-center">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </motion.div>
  );
};
