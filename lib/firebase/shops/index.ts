import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { app } from "../firebase";
import { Shop } from "./types"; // À créer pour typer les shops

const db = getFirestore(app);
const shopsCol = collection(db, "shops");

// Créer une boutique
export async function createShop(shop: Shop) {
  const shopRef = doc(shopsCol);
  await setDoc(shopRef, {
    ...shop,
    createdAt: Timestamp.now(),
  });
  return shopRef;
}

// Lire une boutique par ID
export async function getShop(shopId: string) {
  const shopRef = doc(shopsCol, shopId);
  const snap = await getDoc(shopRef);
  if (!snap.exists()) return null;
  
  return {
    id: snap.id,
    ...snap.data()
  };
}

// Lire toutes les boutiques
export async function getAllShops() {
  const snap = await getDocs(shopsCol);
  return snap.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(),
  }));
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

