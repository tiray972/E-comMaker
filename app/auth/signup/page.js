"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes"; // Ajout du hook

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { theme } = useTheme(); // Récupère le thème global

  // Function to save user to Firestore
  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid); // Reference to the user document in Firestore
      const userSnap = await getDoc(userDocRef); // Check if the user already exists in Firestore

      if (!userSnap.exists()) {
        // If the user doesn't exist in Firestore, create them
        const newUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User", // Take the user's name or a default name
          createdAt: new Date(), // Creation date
        };

        await setDoc(userDocRef, newUser); // Add the document to Firestore
        console.log("User added to Firestore:", newUser);
      } else {
        console.log("User already exists in Firestore:", userSnap.data());
      }
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  // Function to handle sign-up via email and password
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Check for empty fields
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password); // Sign up with email and password
      console.log("Sign-up successful:", user);

      // Save the user to Firestore
      await saveUserToFirestore(user);

      // Redirect to the dashboard or another page
      router.push("/app/auth/signup2");
    } catch (error) {
      console.error("Sign-up error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle sign-up via Google
  const handleGoogleSignUp = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await signInWithGoogle(); // Sign in with Google
      console.log("Google sign-up successful:", user);

      // Save the user to Firestore
      await saveUserToFirestore(user);

      // Redirect to the dashboard or another page
      router.push("/app/auth/signup2");
    } catch (error) {
      console.error("Google sign-up error:", error);
      setError("An error occurred during Google sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-black"
          : "bg-white"
      }`}
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSignUp}
          className={`space-y-5 flex flex-col items-center justify-center p-8 rounded-xl shadow-lg border ${
            theme === "dark"
              ? "bg-neutral-900 border-neutral-800"
              : "bg-white border-blue-100"
          }`}
        >
          <CircleUserRound
            className={`mb-2 ${theme === "dark" ? "text-teal-300" : "text-teal-400"}`}
            size={64}
          />
          <h1
            className={`text-2xl font-bold text-center ${
              theme === "dark" ? "text-white" : "text-blue-700"
            }`}
          >
            Créer un compte
          </h1>
          <p
            className={`text-center text-sm mb-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Rejoignez-nous et commencez votre aventure e-commerce !
          </p>

          {error && (
            <p className="bg-red-100 border border-red-300 text-red-600 text-sm text-center rounded px-3 py-2 w-full dark:bg-red-900 dark:border-red-700 dark:text-red-300">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Adresse e-mail"
            className={`border p-2 w-full rounded outline-none transition-all ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-400 focus:border-teal-400"
                : "bg-white border-blue-200 text-gray-900 focus:border-teal-400"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className={`border p-2 w-full rounded outline-none transition-all ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-400 focus:border-teal-400"
                : "bg-white border-blue-200 text-gray-900 focus:border-teal-400"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className={`border p-2 w-full rounded outline-none transition-all ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-400 focus:border-teal-400"
                : "bg-white border-blue-200 text-gray-900 focus:border-teal-400"
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : theme === "dark"
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </button>
          <button
            className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-semibold border transition-all duration-200 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-gray-200 hover:bg-neutral-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 32.9 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5 0-1.4-.1-2.7-.3-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.5 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/>
                <path fill="#FBBC05" d="M24 45c5.5 0 10.5-1.8 14.4-4.9l-6.7-5.5C29.9 36.7 27.1 37.5 24 37.5c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.9 41.1 15.4 45 24 45z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2.1l-7 5.4C18.5 44.3 21.1 45 24 45c10.5 0 19.5-7.6 21-17.5 0-1.4-.1-2.7-.3-4z"/>
              </g>
            </svg>
            {isLoading ? "Inscription en cours..." : "S'inscrire avec Google"}
          </button>
        </form>
        <div className="flex justify-center mt-6">
          <Link
            href={"/auth/login"}
            className={`text-sm underline transition-colors ${
              theme === "dark"
                ? "text-teal-300 hover:text-teal-400"
                : "text-teal-600 hover:text-teal-800"
            }`}
          >
            Déjà inscrit ? Connectez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}
