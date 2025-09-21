
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import z from "zod";
import { motion } from "framer-motion";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { ApiError } from "@/types";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";


// Form validation schema
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state)
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation()
  const [verifyOtp] = useVerifyOtpMutation()
    const [timer, setTimer] = useState(5);
  // Initialize the form
 const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");

    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP Sent", { id: toastId });
        setConfirmed(true);
        setTimer(5);
      }
    } catch (error) {
         const err = error as ApiError;
    const message = err?.data?.message || "OTP Verification Failed.";
    toast.error(message);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
        setConfirmed(true);
        navigate("/dashboard");
      }
    } catch (error) {

    console.error("OTP verify failed ❌", error);
    const err = error as ApiError;
    const message = err?.data?.message || "OTP Verification Failed.";
    toast.error(message);
    }
  };

  // ! Needed - Turned off for development
    useEffect(() => {
      if (!email) {
        navigate("/");
      }
    }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
    >
      {confirmed ? (
        // OTP Verification Form
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl text-indigo-700 dark:text-indigo-400">Verify OTP</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                Enter the one-time password sent to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Wrap the form with FormProvider */}
              <FormProvider {...form}>
                  <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resent OPT:{" "}
                        </Button>{" "}
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
        </motion.div>
      ) : (
        // Send OTP Form
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Verify your email address</CardTitle>
              <CardDescription>
                We will send you an OTP at <br /> {email}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button onClick={handleSendOtp} className="w-full">
                Confirm
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};
