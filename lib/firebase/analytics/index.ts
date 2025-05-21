import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Analytics } from "./types"; // À créer pour typer les analytics

const db = getFirestore();
const analyticsCol = collection(db, "analytics");

// Créer ou mettre à jour une entrée analytics
export async function setAnalytics(analyticsId: string, analytics: Analytics) {
  const analyticsRef = doc(analyticsCol, analyticsId);
  await setDoc(analyticsRef, {
    ...analytics,
    date: analytics.date || Timestamp.now(),
  });
  return analyticsRef;
}

// Lire une entrée analytics par ID
export async function getAnalytics(analyticsId: string) {
  const analyticsRef = doc(analyticsCol, analyticsId);
  const snap = await getDoc(analyticsRef);
  return snap.exists() ? snap.data() : null;
}

// Lire toutes les entrées analytics
export async function getAllAnalytics() {
  const snap = await getDocs(analyticsCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour une entrée analytics
export async function updateAnalytics(analyticsId: string, data: Partial<Analytics>) {
  const analyticsRef = doc(analyticsCol, analyticsId);
  await updateDoc(analyticsRef, data);
}

// Supprimer une entrée analytics
export async function deleteAnalytics(analyticsId: string) {
  const analyticsRef = doc(analyticsCol, analyticsId);
  await deleteDoc(analyticsRef);
}