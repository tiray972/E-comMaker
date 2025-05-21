import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Review } from "./types"; // À créer pour typer les reviews

const db = getFirestore();
const reviewsCol = collection(db, "reviews");

// Créer un avis
export async function createReview(review: Review) {
  const reviewRef = doc(reviewsCol);
  await setDoc(reviewRef, {
    ...review,
    createdAt: Timestamp.now(),
  });
  return reviewRef;
}

// Lire un avis par ID
export async function getReview(reviewId: string) {
  const reviewRef = doc(reviewsCol, reviewId);
  const snap = await getDoc(reviewRef);
  return snap.exists() ? snap.data() : null;
}

// Lire tous les avis
export async function getAllReviews() {
  const snap = await getDocs(reviewsCol);
  return snap.docs.map(doc => doc.data());
}

// Mettre à jour un avis
export async function updateReview(reviewId: string, data: Partial<Review>) {
  const reviewRef = doc(reviewsCol, reviewId);
  await updateDoc(reviewRef, data);
}

// Supprimer un avis
export async function deleteReview(reviewId: string) {
  const reviewRef = doc(reviewsCol, reviewId);
  await deleteDoc(reviewRef);
}