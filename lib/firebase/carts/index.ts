import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Cart } from "./types"; // À créer pour typer les carts

const db = getFirestore();
const cartsCol = collection(db, "carts");

// Créer ou mettre à jour un panier
export async function setCart(userId: string, cart: Cart) {
  const cartRef = doc(cartsCol, userId);
  await setDoc(cartRef, {
    ...cart,
    updatedAt: Timestamp.now(),
  });
  return cartRef;
}

// Lire un panier par userId
export async function getCart(userId: string) {
  const cartRef = doc(cartsCol, userId);
  const snap = await getDoc(cartRef);
  return snap.exists() ? snap.data() : null;
}

// Lire tous les paniers
export async function getAllCarts() {
  const snap = await getDocs(cartsCol);
  return snap.docs.map(doc => doc.data());
}

// Supprimer un panier
export async function deleteCart(userId: string) {
  const cartRef = doc(cartsCol, userId);
  await deleteDoc(cartRef);
}