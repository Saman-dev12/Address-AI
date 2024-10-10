"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Header from "@/components/ui/header";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formObject = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type FormValues = z.infer<typeof formObject>;

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formObject),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error("Sign-in error:", result.error);
        toast.error("Invalid Credentials");
      } else {
        toast.success("Login Successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-screen-2xl mx-auto w-full bg-black px-3 lg:px-14">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-lg shadow-lg p-8 border border-purple-500/20"
            >
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-purple-300 mb-1">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="w-full bg-white/10 border-purple-500/30 focus:border-purple-500 text-white placeholder-purple-300/50"
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-purple-300 mb-1">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isLoading}
                              type={showPassword ? "text" : "password"}
                              className="w-full bg-white/10 border-purple-500/30 focus:border-purple-500 text-white placeholder-purple-300/50 pr-10"
                              placeholder="Enter your password"
                            />
                            <button
                              disabled={isLoading}
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-400 hover:text-purple-300"
                            >
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-80 transition-all duration-300 py-5 rounded-md shadow-lg"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
              <div className="mt-6 text-center">
                <p className="text-sm text-purple-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="font-medium text-purple-400 hover:text-purple-300"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                className="bg-white/5 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-300 hover:opacity-80 transition-all duration-300 py-5 px-8 rounded-md shadow-lg"
              >
                <Link href="/" className="w-full flex">
                  <span className="mr-2">Back to Home</span>
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
