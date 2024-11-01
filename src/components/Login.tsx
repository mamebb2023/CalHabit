"use client";

import React, { useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Fleur_De_Leah } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { validateEmail, validatePassword } from "@/lib/utils";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Login = () => {
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
      const data = JSON.parse(JSON.stringify({ email, password }));
      const user = await getUserByEmail(data);

      if (user.error) {
        setError(user.error);
        return;
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}`,
      });
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
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
      className="p-7 flex gap-5 flex-col w-[90%] lg:w-[400px] bg-glass rounded-3xl"
    >
      <h2 className={`h2 ${font.className}`}>Login</h2>
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
        <Input type="text" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />

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
      </form>
    </motion.div>
  );
};

export default Login;
