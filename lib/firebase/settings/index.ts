import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Settings } from "./types"; // À créer pour typer les settings

const db = getFirestore();
const settingsCol = collection(db, "settings");

// Créer ou mettre à jour une config (par exemple, "platform" ou par shopId)
export async function setSettings(settingsId: string, settings: Settings) {
  const settingsRef = doc(settingsCol, settingsId);
  await setDoc(settingsRef, settings);
  return settingsRef;
}

// Lire une config par ID
export async function getSettings(settingsId: string) {
  const settingsRef = doc(settingsCol, settingsId);
  const snap = await getDoc(settingsRef);
  return snap.exists() ? snap.data() : null;
}

// Lire toutes les configs
export async function getAllSettings() {
  const snap = await getDocs(settingsCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour une config
export async function updateSettings(settingsId: string, data: Partial<Settings>) {
  const settingsRef = doc(settingsCol, settingsId);
  await updateDoc(settingsRef, data);
}

// Supprimer une config
export async function deleteSettings(settingsId: string) {
  const settingsRef = doc(settingsCol, settingsId);
  await deleteDoc(settingsRef);
}