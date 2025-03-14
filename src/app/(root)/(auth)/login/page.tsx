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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    if (!validatePassword(password)) {
      return setError("Password must be at least 8 characters long.");
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
          return setError("An error occurred. Please try again.");
        }

        console.log("user", user);

        toast({
          title: "Login Successful",
          description: `Welcome! ${user.name}!`,
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
    <div className="p-7 flex gap-5 flex-col w-[90%] lg:w-[400px] bg-glass-gradient rounded-3xl">
      <h1 className={`h1 text-[3em] leading-[3.5rem] ${font.className}`}>
        Login
      </h1>
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

      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full">
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

        <Link
          href="/register"
          className="text-[.9em] hover:underline font-[300]"
        >
          Don&apos;t have an account?{" "}
          <span className="font-normal">Register here</span>
        </Link>
      </form>
    </div>
  );
};

export default Page;
