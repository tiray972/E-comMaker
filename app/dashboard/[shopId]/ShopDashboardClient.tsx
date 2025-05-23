"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { Shop } from "@/lib/firebase/shops/types";

export default function ShopDashboardClient({ shop }: { shop: Shop }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.push("/auth/login"); // Redirect to login if no user is authenticated
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to {shop.name}'s Dashboard</h1>
      <p className="text-gray-600">Manage your shop settings, products, and more.</p>
      {/* Add more dashboard content here */}
    </div>
  );
}