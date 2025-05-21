import {
    doc,
    collection,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    orderBy,
  } from "firebase/firestore";
  import { db } from "@/lib/firebase/firebase";
  
  // Récupérer tous les utilisateurs triés par date d'ajout
  export async function fetchAllUsers() {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
  
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return users;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      return [];
    }
  }
  
  // Modifier les données d'un utilisateur
  export async function updateUser(userId, updatedData) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedData);
      alert("Utilisateur modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      alert("Impossible de modifier l'utilisateur. Veuillez réessayer.");
    }
  }
  
  // Supprimer un utilisateur
  export async function deleteUser(userId) {
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      alert("Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      alert("Impossible de supprimer l'utilisateur. Veuillez réessayer.");
    }
  }
  
  // Bloquer ou débloquer un utilisateur
  export async function toggleBlockUser(userId, isBlocked) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { isBlocked });
      alert(`Utilisateur ${isBlocked ? "bloqué" : "débloqué"} avec succès !`);
    } catch (error) {
      console.error("Erreur lors du blocage/déblocage de l'utilisateur :", error);
      alert("Impossible de mettre à jour le statut de l'utilisateur.");
    }
  }
  