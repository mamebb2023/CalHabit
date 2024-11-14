"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useToast } from "@/hooks/use-toast";
import { getUserFromToken, validateEmail, validatePassword } from "@/lib/utils";
import Link from "next/link";
import { Fleur_De_Leah } from "next/font/google";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError("");

    // Handle successful login logic here
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store the token in localStorage or cookies (if you prefer)
        localStorage.setItem("token", data.token); // Store JWT token in localStorage

        const user = getUserFromToken();

        if (!user) {
          setError("An error occurred. Please try again.");
          return;
        }

        toast({
          title: "Login Successful",
          description: `You have successfully logged in. Welcome back, ${user.name}, ${user.email}!`,
        });

        router.push("/habits");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      throw err;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className="p-7 flex gap-5 flex-col w-[90%] lg:w-[400px] bg-glass rounded-3xl"
    >
      <h2 className={`h2 ${font.className}`}>Login</h2>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-[.8em]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <Input type="text" placeholder="Email" ref={emailRef} />
        <Input
          type={!showPassword ? "password" : "text"}
          placeholder="Password"
          ref={passwordRef}
        />

        <label className="flex items-center gap-1 justify-end text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="form-checkbox text-primary"
          />
          <span>Show Password</span>
        </label>

        <div className="flex-center my-3">
          <Button type="submit">Login</Button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { opacity: { duration: 0.3, delay: 0.4 } },
            }}
            transition={{ duration: 0.4 }}
            className="w-full text-[.9em] ml-3 cursor-pointer hover:underline"
            // onClick={handleClick}
          >
            <Link href="/register" className="text-color-primary ml-1">
              Don&apos;t have an account? Register here
            </Link>
          </motion.div>
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default Page;
