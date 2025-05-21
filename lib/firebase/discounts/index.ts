import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Discount } from "./types"; // À créer pour typer les discounts

const db = getFirestore();
const discountsCol = collection(db, "discounts");

// Créer un code promo
export async function createDiscount(discount: Discount) {
  const discountRef = doc(discountsCol);
  await setDoc(discountRef, {
    ...discount,
    expirationDate: discount.expirationDate || Timestamp.now(),
  });
  return discountRef;
}

// Lire un code promo par ID
export async function getDiscount(discountId: string) {
  const discountRef = doc(discountsCol, discountId);
  const snap = await getDoc(discountRef);
  return snap.exists() ? snap.data() : null;
}

// Lire tous les codes promo
export async function getAllDiscounts() {
  const snap = await getDocs(discountsCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour un code promo
export async function updateDiscount(discountId: string, data: Partial<Discount>) {
  const discountRef = doc(discountsCol, discountId);
  await updateDoc(discountRef, data);
}

// Supprimer un code promo
export async function deleteDiscount(discountId: string) {
  const discountRef = doc(discountsCol, discountId);
  await deleteDoc(discountRef);
}