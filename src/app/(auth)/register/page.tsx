"use client";

import React, { useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { AnimatePresence, motion } from "framer-motion";
import { validateEmail, validatePassword, validateName } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fleur_De_Leah } from "next/font/google";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (!validateName(name)) {
      setError("Your name must be at least 2 characters long, right?");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    if (!validatePassword(password)) {
      setError("Your password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Confirm your password");
      return;
    }

    setError("");

    // Handle successful registration logic here
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Account Created",
          description: "Please login to continue.",
        });

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-7 flex gap-3 flex-col w-[90%] lg:w-[400px] bg-glass rounded-3xl">
      <h1 className={`h1 text-[3em] leading-[3.5rem] ${font.className}`}>
        Register
      </h1>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-[.8em]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <Input type="text" placeholder="Your Name" ref={nameRef} />
        <Input type="text" placeholder="Email" ref={emailRef} />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          ref={passwordRef}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />

        <label className="flex items-center gap-1 justify-end text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <span>Show Password</span>
        </label>

        <div className="flex-center my-3">
          <Button type="submit">Register</Button>
        </div>
        <Link href="/login" className="text-[.9em] hover:underline font-[300]">
          Already have an account?{" "}
          <span className="font-normal">Login here</span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
