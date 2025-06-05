"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { createUser } from "@/lib/firebase/users/index";
import { createShop } from "@/lib/firebase/shops";
import { User } from "@/lib/firebase/users/types";
import { Shop } from "@/lib/firebase/shops/types";
import { useTheme } from "next-themes";
import { CircleUserRound } from "lucide-react";

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

      const newShop: Omit<Shop, "id"> = {
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
      const newShop: Omit<Shop, "id"> = {
        name: `${generatedName}'s Shop`,
        ownerId: user.uid,
        slug: `${generatedName.toLowerCase().replace(/\s+/g, "-")}-shop`,
        isActive: true,
        createdAt: new Date(),
      };
      const shopRef = await createShop(newShop);

      const newUser: User = {
        uid: user.uid,
        email: user.email || "",
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
        theme === "dark" ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-blue-50 to-white"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          theme === "dark"
            ? "bg-transparent" // Fond transparent sans ombre pour le thème sombre
            : "bg-gradient-to-br from-blue-50 to-white"
        }`}
      >
        <form
          onSubmit={handleSignUp}
          className={`space-y-5 flex flex-col items-center justify-center p-8 rounded-xl ${
            theme === "dark"
              ? "bg-transparent border border-neutral-800" // Fond transparent et bordure ajustée pour le formulaire dans le thème sombre
              : "border bg-gradient-to-br from-blue-50 to-white border-blue-100"
          }`}
        >
          <CircleUserRound
            className={`mb-2 ${theme === "dark" ? "text-teal-300" : "text-teal-400"}`}
            size={64}
          />
          <h1
            className={`text-3xl font-extrabold text-center ${
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
            Inscrivez-vous pour continuer.
          </p>

          {error && (
            <p className="bg-red-100 border border-red-300 text-red-600 text-sm text-center rounded px-3 py-2 w-full dark:bg-red-900 dark:border-red-700 dark:text-red-300">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Votre nom"
            className={`border p-3 w-full rounded-lg outline-none transition-all ${
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
            className={`border p-3 w-full rounded-lg outline-none transition-all ${
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
            className={`border p-3 w-full rounded-lg outline-none transition-all ${
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
            className={`border p-3 w-full rounded-lg outline-none transition-all ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-400 focus:border-teal-400"
                : "bg-white border-blue-200 text-gray-900 focus:border-teal-400"
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
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
            className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg font-semibold border transition-all duration-200 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-gray-200 hover:bg-neutral-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            type="button"
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
            {isLoading ? "" : "S'inscrire avec Google"}
          </button>
        </form>
      </div>
    </div>
  );
}
