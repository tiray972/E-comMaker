import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Category } from "./types"; // À créer pour typer les catégories

const db = getFirestore();
const categoriesCol = collection(db, "categories");

// Créer une catégorie
export async function createCategory(category: Category) {
  const categoryRef = doc(categoriesCol);
  await setDoc(categoryRef, category);
  return categoryRef;
}

// Lire une catégorie par ID
export async function getCategory(categoryId: string) {
  const categoryRef = doc(categoriesCol, categoryId);
  const snap = await getDoc(categoryRef);
  return snap.exists() ? snap.data() : null;
}

// Lire toutes les catégories
export async function getAllCategories() {
  const snap = await getDocs(categoriesCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour une catégorie
export async function updateCategory(categoryId: string, data: Partial<Category>) {
  const categoryRef = doc(categoriesCol, categoryId);
  await updateDoc(categoryRef, data);
}

// Supprimer une catégorie
export async function deleteCategory(categoryId: string) {
  const categoryRef = doc(categoriesCol, categoryId);
  await deleteDoc(categoryRef);
}