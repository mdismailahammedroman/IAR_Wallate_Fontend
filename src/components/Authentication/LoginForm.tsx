/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import animationData from "../../assets/lottie/loading1.json";
import { useForm, type SubmitHandler,  } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import Lottie from "react-lottie";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

 const LoginForm = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "Ismail@47",
    },
  });

  const [login] = useLoginMutation();

const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
  try {
    const response = await login(data).unwrap(); // ✅ Use form data

    const { user } = response.data;
console.log(user.role);

    if (!user?.role) {
      console.error("Missing role in login response");
      return;
    }

    localStorage.setItem("role", user.role);

// Then navigate somewhere appropriate
if (user.role === "AGENT") {
  navigate("/agent/profileinfo");
} else {
  navigate("/user/me");
}
      navigate("/");
  } catch (err: any) {
    console.error("Login error:", err);

    const message = err?.data?.message;
    if (message === "Password does not match") {
      toast.error("Invalid credentials");
    } else if (message === "User is not verified") {
      toast.error("Your account is not verified");
      navigate("/verify", { state: data.email });  // Pass email to /verify
    } else {
      toast.error("Something went wrong");
    }
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
      className="h-screen bg-gray-100 flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 p-4">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-indigo-700"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome Back!
          </motion.h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
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
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
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

          <p className="text-center text-sm mt-4 text-gray-800">
            Don't have an account?{" "}
            <Link to="/user/register" className="text-indigo-600 cursor-pointer">
                     
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default LoginForm