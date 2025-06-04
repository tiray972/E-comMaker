"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { getUserShops } from "@/lib/firebase/users/index"; // Fonction pour récupérer les boutiques de l'utilisateur
import Link from "next/link";

export default function MyShopsPage() {
  const [user, setUser] = useState<any>(null);
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.log("Utilisateur non connecté, redirection...");
        router.replace("/auth/login"); // Utilisez `replace` au lieu de `push` pour éviter d'empiler les routes
        return;
      }

      setUser(firebaseUser);
      console.log("Utilisateur connecté :", firebaseUser);

      // Récupérer les boutiques de l'utilisateur
      const userShops = await getUserShops(firebaseUser.uid);
      setShops(userShops);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mes Boutiques</h1>
      {shops.length === 0 ? (
        <p className="text-gray-600">Vous n'avez pas encore créé de boutiques.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map((shop) => (
            <li key={shop.id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{shop.name}</h2>
              <p className="text-gray-600">ID: {shop.id}</p>
              <p className="text-gray-600">Slug: {shop.slug}</p>
              <Link href={`/dashboard/${shop.id}`}>
                <a className="text-blue-500 hover:underline">Accéder au Dashboard</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}