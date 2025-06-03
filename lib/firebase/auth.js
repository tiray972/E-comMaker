import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setCookie, getCookie } from 'cookies-next';

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken(true);
    console.log("Token d'authentification :", token);
    await sendTokenToServer(token); // ➕ ici

    return user;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};


// Connexion avec e-mail et mot de passe
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken(true);
    console.log("Token d'authentification :", token);
    await sendTokenToServer(token); // ➕ ici

    return user;
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
    const user = result.user;

    const token = await user.getIdToken(true);
    console.log("Token d'authentification :", token);
    await sendTokenToServer(token); // ➕ ici

    return user;
  } catch (error) {
    console.error("Erreur lors de la connexion Google :", error);
    throw error;
  }
};


// Déconnexion
export const logOut = async () => {
  try {
    await signOut(auth);
    await fetch('/api/session/logout', { method: 'POST' });

    console.log("Déconnexion réussie !");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};

// Écoute des changements d'état d'authentification
export const listenAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("L'utilisateur est authentifié :", user);
      callback(user);
    } else {
      console.log("L'utilisateur n'est pas authentifié.");
      callback(null);
    }
  });
};

// Lire le cookie de session
export const getSessionCookie = () => {
  return getCookie('session');
};
// Envoie le token au backend pour créer le session cookie httpOnly
const sendTokenToServer = async (token) => {
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    console.error("Échec de la création du cookie de session.");
    throw new Error('Erreur de session');
  }
};
