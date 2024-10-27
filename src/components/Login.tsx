"use client";

import React from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { Fleur_De_Leah } from "next/font/google";
import { motion } from "framer-motion";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      className="p-7 flex-center gap-5 flex-col w-[90%] lg:w-[400px] bg-glass rounded-3xl"
    >
      <h3 className={`h3 ${font.className}`}>Login</h3>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 w-full"
      >
        <Input className="bg-glass" type="email" placeholder="Email" required />
        <Input
          className="bg-glass"
          type="password"
          placeholder="Password"
          required
        />

        <div className="flex-center my-3">
          <Button type="submit" className="">
            Login
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Login;
