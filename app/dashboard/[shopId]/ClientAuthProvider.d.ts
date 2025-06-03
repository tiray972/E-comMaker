declare module './ClientAuthProvider' {
  import React from 'react';

  interface AuthData {
    uid: string;
    shop: {
      createdAt: {
        seconds: number;
        nanoseconds: number;
      } | null;
      slug: string;
      id: string;
      isActive: boolean;
      ownerId: string;
      name: string;
    };
  }

  interface ClientAuthProviderProps {
    authData: AuthData;
    children: React.ReactNode;
  }

  const ClientAuthProvider: React.FC<ClientAuthProviderProps>;

  export default ClientAuthProvider;
}