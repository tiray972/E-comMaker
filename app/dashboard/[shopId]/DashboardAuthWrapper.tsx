"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import type { Shop } from "@/lib/firebase/shops/types";

interface Props {
  shop: Shop;
  children: React.ReactNode;
}

export default function DashboardAuthWrapper({ shop, children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Vérifier si l'utilisateur est le propriétaire de la boutique
      if (shop.ownerId !== user.uid) {
        router.push(`/dashboard/${user.uid}`); // Redirige vers le tableau de bord de l'utilisateur
        return;
      }
    });

    return () => unsubscribe();
  }, [shop, router]);

  return <>{children}</>;
}