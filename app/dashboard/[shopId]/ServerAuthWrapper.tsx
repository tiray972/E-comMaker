// app/dashboard/[shopId]/ServerAuthWrapper.tsx
import { admin } from '@/lib/firebase/admin';
import { getShop } from '@/lib/firebase/shops';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';


export default async function ServerAuthWrapper({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { shopId: string };
}) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    console.error('⛔️ Aucun cookie de session trouvé');
    redirect('/auth/login');
  }

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const shopId = params?.shopId;

    if (!shopId) {
      console.error('⛔️ Paramètre shopId manquant');
      redirect('/auth/login');
    }

    const shop = await getShop(shopId);

    if (!shop || shop.ownerId !== decodedClaims.uid) {
      console.error('⛔️ Boutique introuvable ou accès non autorisé');
      redirect('/gotoshop');
    }

    // Convert timestamps
    const plainShop = {
      ...shop,
      createdAt: shop.createdAt
        ? {
            seconds: shop.createdAt.seconds,
            nanoseconds: shop.createdAt.nanoseconds,
          }
        : null,
    };

    const authData = {
      uid: decodedClaims.uid,
      shop: plainShop,
    };

    return <AuthProvider value={authData}>{children}</AuthProvider>;
  } catch (error) {
    console.error('❌ Erreur session/shop :', error);
    redirect('/gotoshop');
  }
}
