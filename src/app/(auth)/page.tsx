import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex gap-3">
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Page;
