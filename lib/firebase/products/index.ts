import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Product } from "./types"; // À créer pour typer les products

const db = getFirestore();
const productsCol = collection(db, "products");

// Créer un produit
export async function createProduct(product: Product) {
  const productRef = doc(productsCol);
  await setDoc(productRef, {
    ...product,
    createdAt: Timestamp.now(),
  });
  return productRef;
}

// Lire un produit par ID
export async function getProduct(productId: string) {
  const productRef = doc(productsCol, productId);
  const snap = await getDoc(productRef);
  return snap.exists() ? snap.data() : null;
}

// Lire tous les produits
export async function getAllProducts() {
  const snap = await getDocs(productsCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour un produit
export async function updateProduct(productId: string, data: Partial<Product>) {
  const productRef = doc(productsCol, productId);
  await updateDoc(productRef, data);
}

// Supprimer un produit
export async function deleteProduct(productId: string) {
  const productRef = doc(productsCol, productId);
  await deleteDoc(productRef);
}