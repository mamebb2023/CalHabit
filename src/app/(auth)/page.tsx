"use client";

import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Register = dynamic(() => import("@/components/Register"), { ssr: false });
const Login = dynamic(() => import("@/components/Login"), { ssr: false });

const Page = () => {
  const router = useRouter();
  const [register, setRegister] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    setRegister((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/habits");
    }
  }, [router]);

  return (
    <div className="h-screen bg-color-tertiary flex-center">
      <div>
        <AnimatePresence mode="wait">
          {register ? <Register key="register" /> : <Login key="login" />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={register ? "register-text" : "login-text"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { opacity: { duration: 0.3, delay: 0.4 } },
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full text-[.9em] ml-3 cursor-pointer hover:underline"
            onClick={handleClick}
          >
            <span className="font-[300]">
              {register ? "Already have an account?" : "Don't have an account?"}
            </span>
            <span className="text-color-primary ml-1">
              {register ? "Login here" : "Register here"}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
