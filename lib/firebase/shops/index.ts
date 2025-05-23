import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
<<<<<<< HEAD
<<<<<<< HEAD
import { Shop } from "./types";
=======
=======
import { app } from "../firebase";
>>>>>>> 17c4bb9 (update login session + dasbord)
import { Shop } from "./types"; // À créer pour typer les shops
>>>>>>> 19fe231 (push user & shops)

const db = getFirestore(app);
const shopsCol = collection(db, "shops");

// Créer une boutique
export async function createShop(shop: Shop) {
  const shopRef = doc(shopsCol);
  await setDoc(shopRef, {
    ...shop,
    createdAt: Timestamp.now(),
<<<<<<< HEAD
    stripeAccountStatus: shop.stripeAccountId ? 'pending' : undefined,
=======
>>>>>>> 19fe231 (push user & shops)
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
<<<<<<< HEAD
<<<<<<< HEAD
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
=======
  return snap.docs.map(doc => doc.data());
>>>>>>> 19fe231 (push user & shops)
=======
  return snap.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(),
  }));
>>>>>>> 17c4bb9 (update login session + dasbord)
}

// Mettre à jour une boutique
export async function updateShop(shopId: string, data: Partial<Shop>) {
  const shopRef = doc(shopsCol, shopId);
  await updateDoc(shopRef, data);
}

<<<<<<< HEAD
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

=======
>>>>>>> 19fe231 (push user & shops)
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

