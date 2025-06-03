"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { createUser } from "@/lib/firebase/users/index";
import { createShop } from "@/lib/firebase/shops";
import { User } from "@/lib/firebase/users/types";
import { Shop } from "@/lib/firebase/shops/types";
import { useTheme } from "next-themes";
import { generateUniqueId } from "@/lib/utils"; // Import the unique ID generator

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password);

      if (!user || !user.uid) {
        throw new Error("L'utilisateur n'a pas pu être créé.");
      }

      const newShop: Shop = {
        id: generateUniqueId(), // Ensure `id` is included
        name: `${name}'s Shop`,
        ownerId: user.uid,
        slug: `${name.toLowerCase().replace(/\s+/g, "-")}-shop`,
        isActive: true,
        createdAt: new Date(),
      };
      const shopRef = await createShop(newShop);

      const newUser: User = {
        uid: user.uid,
        email: user.email,
        username: name,
        displayName: name,
        role: "seller",
        shopIds: [shopRef.id],
        createdAt: new Date(),
      };
      await createUser(newUser);

      router.push(`/dashboard/${shopRef.id}`);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé.");
      } else {
        setError(error.message || "Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await signInWithGoogle();

      if (!user || !user.uid) {
        throw new Error("La connexion avec Google a échoué.");
      }

      const generatedName = user.displayName || "Utilisateur";
      const newShop: Shop = {
        id: generateUniqueId(), // Ensure `id` is included
        name: `${generatedName}'s Shop`,
        ownerId: user.uid,
        slug: `${generatedName.toLowerCase().replace(/\s+/g, "-")}-shop`,
        isActive: true,
        createdAt: new Date(),
      };
      const shopRef = await createShop(newShop);

      const newUser: User = {
        uid: user.uid,
        email: user.email || "", // Default to an empty string if email is null
        username: generatedName,
        displayName: generatedName,
        role: "seller",
        shopIds: [shopRef.id],
        createdAt: new Date(),
      };
      await createUser(newUser);

      router.push(`/dashboard/${shopRef.id}`);
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue lors de la connexion avec Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
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
          <h1
            className={`text-2xl font-bold text-center ${
              theme === "dark" ? "text-white" : "text-blue-700"
            }`}
          >
            Créer un compte
          </h1>

          {error && (
            <p className="bg-red-100 border border-red-300 text-red-600 text-sm text-center rounded px-3 py-2 w-full dark:bg-red-900 dark:border-red-700 dark:text-red-300">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Votre nom"
            className={`border p-2 w-full rounded outline-none transition-all ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-400 focus:border-teal-400"
                : "bg-white border-blue-200 text-gray-900 focus:border-teal-400"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
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
            onClick={handleGoogleSignIn}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : theme === "dark"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter avec Google"}
          </button>
        </form>
      </div>
    </div>
  );
}
