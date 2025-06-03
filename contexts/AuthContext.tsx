// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext } from 'react';

interface Shop {
  id: string;
  name: string;
  ownerId: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

interface AuthData {
  uid: string;
  shop: Shop;
}

const AuthContext = createContext<AuthData | null>(null);

export const AuthProvider = ({
  value,
  children,
}: {
  value: AuthData;
  children: React.ReactNode;
}) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
