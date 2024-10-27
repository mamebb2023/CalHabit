"use client";

import React, { useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Fleur_De_Leah } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { validateEmail, validatePassword, validateName } from "@/lib/utils";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      className="p-7 flex gap-5 flex-col w-[90%] lg:w-[400px] bg-glass rounded-3xl"
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
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />

        <div className="flex-center my-3">
          <Button type="submit" className="">
            Register
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
