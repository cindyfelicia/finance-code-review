import React, { createContext, useContext, useState } from "react";

export type AuthContextType = {
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: any) => {

  return (
    <AuthContext.Provider
      value={{
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be use inside AuthProvider");
  return context;
};

export default AuthProvider;
