import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-color-tertiary flex-center">{children}</div>
  );
};

export default Layout;
