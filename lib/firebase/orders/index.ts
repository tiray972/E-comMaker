import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Order } from "./types"; // À créer pour typer les orders

const db = getFirestore();
const ordersCol = collection(db, "orders");

// Créer une commande
export async function createOrder(order: Order) {
  const orderRef = doc(ordersCol);
  await setDoc(orderRef, {
    ...order,
    createdAt: Timestamp.now(),
  });
  return orderRef;
}

// Lire une commande par ID
export async function getOrder(orderId: string) {
  const orderRef = doc(ordersCol, orderId);
  const snap = await getDoc(orderRef);
  return snap.exists() ? snap.data() : null;
}

// Lire toutes les commandes
export async function getAllOrders() {
  const snap = await getDocs(ordersCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour une commande
export async function updateOrder(orderId: string, data: Partial<Order>) {
  const orderRef = doc(ordersCol, orderId);
  await updateDoc(orderRef, data);
}

// Supprimer une commande
export async function deleteOrder(orderId: string) {
  const orderRef = doc(ordersCol, orderId);
  await deleteDoc(orderRef);
}