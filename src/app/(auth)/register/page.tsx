"use client";

import React, { useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Fleur_De_Leah } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { validateEmail, validatePassword, validateName } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { LordIcon } from "@/components/LordIcon/LordIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
          description: (
            <div className="flex items-center gap-3">
              <LordIcon
                src="https://cdn.lordicon.com/lomfljuq.json"
                trigger="in"
                size={28}
              />
              <p>Please login to continue</p>
            </div>
          ),
        });

        setTimeout(() => {
          // router.push("/login");
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className="p-7 flex gap-3 flex-col w-[90%] lg:w-[400px] bg-glass rounded-3xl"
    >
      <h2 className={`h2 ${font.className}`}>Register</h2>
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
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { opacity: { duration: 0.3, delay: 0.4 } },
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full text-[.9em] ml-3 cursor-pointer hover:underline"
          >
            <Link href="/login" className="font-[300]">
              Already have an account? Login here
            </Link>
          </motion.div>
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default Register;
