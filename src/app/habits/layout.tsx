import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-color-tertiary">{children}</div>;
};

export default Layout;
