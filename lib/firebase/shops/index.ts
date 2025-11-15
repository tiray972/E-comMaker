// lib/firebase/shops/index.ts

import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Shop } from "./types";
import { app } from "../firebase";

const db = getFirestore(app);
const shopsCol = collection(db, "shops");

// Créer une boutique
export async function createShop(shop: Omit<Shop, "id">) {
  const shopRef = doc(shopsCol); // Firebase génère automatiquement un ID
  const shopData = {
    ...shop,
    createdAt: Timestamp.now(),
  };

  if (shop.stripeAccountId) {
    shopData.stripeAccountStatus = 'pending';
  }

  await setDoc(shopRef, shopData);
  return { id: shopRef.id, ...shopData }; // Retourner l'ID généré par Firebase
}

// Lire une boutique par ID
export async function getShop(shopId: string): Promise<Shop | null> {
  const shopRef = doc(shopsCol, shopId);
  const shopSnap = await getDoc(shopRef);

  if (!shopSnap.exists()) {
    console.error(`Boutique introuvable avec l'ID : ${shopId}`);
    return null;
  }

  return shopSnap.data() as Shop;
}

// Lire toutes les boutiques
export async function getAllShops() {
  const snap = await getDocs(shopsCol);

  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Mettre à jour une boutique
export async function updateShop(shopId: string, data: Partial<Shop>) {
  const shopRef = doc(shopsCol, shopId);
  await updateDoc(shopRef, data);
}

// Supprimer une boutique
export async function deleteShop(shopId: string) {
  const shopRef = doc(shopsCol, shopId);
  await deleteDoc(shopRef);
}

// Mettre à jour le statut Stripe d'une boutique
export async function updateShopStripeStatus(shopId: string, stripeData: {
  accountId: string;
  status: Shop['stripeAccountStatus'];
  details?: Shop['stripeAccountDetails'];
}) {
  const shopRef = doc(shopsCol, shopId);
  await updateDoc(shopRef, {
    stripeAccountId: stripeData.accountId,
    stripeAccountStatus: stripeData.status,
    stripeAccountDetails: stripeData.details,
    updatedAt: Timestamp.now(),
  });
}
export async function updateShopByStripeAccount(
  shopId: string,
  stripeData: {
    status: Shop['stripeAccountStatus'];
    details: Shop['stripeAccountDetails'];
  }
) {
  const shopRef = doc(shopsCol, shopId);

  await updateDoc(shopRef, {
    stripeAccountStatus: stripeData.status,
    stripeAccountDetails: stripeData.details,
    updatedAt: Timestamp.now(),
  });
}
