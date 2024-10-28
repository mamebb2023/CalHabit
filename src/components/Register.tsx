"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Fleur_De_Leah } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { validateEmail, validatePassword, validateName } from "@/lib/utils";
import { createUser } from "@/lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { LordIcon } from "./LordIcon/LordIcon";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Register = () => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setError("");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      const data = JSON.parse(JSON.stringify({ name, email, password }));
      await createUser(data);

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
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubmitting(false);
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
        <Input
          type="text"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
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
      </form>
    </motion.div>
  );
};

export default Register;
