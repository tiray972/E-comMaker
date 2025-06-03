"use client";

import React, { createContext, useContext } from 'react';

// Création du contexte AuthContext
const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}

export default function ClientAuthProvider({ authData, children }: { authData: any; children: React.ReactNode }) {
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}