import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/loading1.json"; // Path to your Lottie animation JSON
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = (data: LoginFormData) => {
    setIsSubmitting(true);
    console.log("Logging in with:", data);
    // Add your API call for login here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-gray-100 flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl max-w-4xl overflow-hidden">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 p-4">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-indigo-700"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome Back!
          </motion.h2>

          <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-4">
            <motion.input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <motion.input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <motion.button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-indigo-600 cursor-pointer">Sign Up</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
