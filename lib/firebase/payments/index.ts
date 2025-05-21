import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Payment } from "./types"; // À créer pour typer les paiements

const db = getFirestore();
const paymentsCol = collection(db, "payments");

// Créer un paiement
export async function createPayment(payment: Payment) {
  const paymentRef = doc(paymentsCol);
  await setDoc(paymentRef, {
    ...payment,
    paymentDate: payment.paymentDate || Timestamp.now(),
  });
  return paymentRef;
}

// Lire un paiement par ID
export async function getPayment(paymentId: string) {
  const paymentRef = doc(paymentsCol, paymentId);
  const snap = await getDoc(paymentRef);
  return snap.exists() ? snap.data() : null;
}

// Lire tous les paiements
export async function getAllPayments() {
  const snap = await getDocs(paymentsCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour un paiement
export async function updatePayment(paymentId: string, data: Partial<Payment>) {
  const paymentRef = doc(paymentsCol, paymentId);
  await updateDoc(paymentRef, data);
}

// Supprimer un paiement
export async function deletePayment(paymentId: string) {
  const paymentRef = doc(paymentsCol, paymentId);
  await deleteDoc(paymentRef);
}