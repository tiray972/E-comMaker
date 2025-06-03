import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { auth } from "../firebase";
import { User } from "./types"; // À créer pour typer les users
import { admin } from '@/lib/firebase/admin'; // Assurez-vous que le chemin est correct

const db = getFirestore();
const usersCol = collection(db, "users");

// Créer un utilisateur
export async function createUser(user: User) {
  const userRef = doc(usersCol, user.uid);
  await setDoc(userRef, {
    ...user,
    createdAt: Timestamp.now(),
  });
  return userRef;
}

// Lire un utilisateur par UID
export async function getUser(uid: string) {
  const userRef = doc(usersCol, uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
}

// Lire tous les utilisateurs
export async function getAllUsers() {
  const snap = await getDocs(usersCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour un utilisateur
export async function updateUser(uid: string, data: Partial<User>) {
  const userRef = doc(usersCol, uid);
  await updateDoc(userRef, data);
}

// Supprimer un utilisateur
export async function deleteUser(uid: string) {
  const userRef = doc(usersCol, uid);
  await deleteDoc(userRef);
}

export async function isShopOwnedByUser(userId: string, shopId: string): Promise<boolean> {
  const userRef = doc(usersCol, userId);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const userData = snap.data();
    return userData.shopIds?.includes(shopId) || false;
  }

  return false;
}

export function getAuth() {
  return auth;
}

// Supprimer l'utilisation de next/headers
// Déplacer la logique côté serveur dans app/api/session/route.ts
export async function getServerAuthUser() {
  throw new Error('Cette fonction doit être appelée côté serveur via app/api/session/route.ts');
}
