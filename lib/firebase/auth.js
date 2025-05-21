import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

// Inscription avec e-mail et mot de passe
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

// Connexion avec e-mail et mot de passe
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

// Connexion avec Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Erreur lors de la connexion Google :", error);
    throw error;
  }
};

// Déconnexion
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Déconnexion réussie !");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};
