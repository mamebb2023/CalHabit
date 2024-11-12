"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Props {
  name: string;
  email: string;
}

interface UserDataProps {
  userData: Props;
  setUserData: (data: Props) => void;
}

const UserContext = createContext<UserDataProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<Props>({
    name: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a FormProvider");
  }
  return context;
};
