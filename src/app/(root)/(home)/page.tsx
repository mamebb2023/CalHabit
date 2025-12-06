"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Page;
