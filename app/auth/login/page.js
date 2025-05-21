"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Redirection utilisateur
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebase"; // Firestore config
import { doc, setDoc, getDoc } from "firebase/firestore";
// import Header from "@/components/header";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Valeur par défaut pour le rôle
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Fonction pour sauvegarder l'utilisateur dans Firestore
  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid); // Référence du document utilisateur dans Firestore
      const userSnap = await getDoc(userDocRef);  // Vérifie si l'utilisateur existe déjà dans Firestore

      if (!userSnap.exists()) {
        // Si l'utilisateur n'existe pas encore dans Firestore, on le crée
        let newUser ={};
        if(role === "agent"){
          newUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "Utilisateur", // Prend le nom de l'utilisateur ou un nom par défaut
            role: role, // Rôle sélectionné
            properties: [],
            createdAt: new Date(), // Date de création
          };
        }else{
          newUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "Utilisateur", // Prend le nom de l'utilisateur ou un nom par défaut
            role: role, // Rôle sélectionné
            createdAt: new Date(), // Date de création
          };
        }

        await setDoc(userDocRef, newUser); // Ajoute le document à Firestore
        console.log("Utilisateur ajouté à Firestore :", newUser);
      } else {
        console.log("Utilisateur déjà existant dans Firestore :", userSnap.data());
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Firestore :", error);
    }
  };

  // Fonction de gestion de la connexion via email et mot de passe
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signInWithEmail(email, password); // Connexion via email et mot de passe
      console.log("Connexion réussie :", user);

      // Sauvegarder l'utilisateur dans Firestore
      await saveUserToFirestore(user);

      // Redirection vers le tableau de bord basé sur le rôle
      router.push(role === "agent" ? "/en/dashboard/agent" : "/en/dashboard/client");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      if (error.code === "auth/user-not-found") {
        setError("Aucun utilisateur trouvé avec cet e-mail.");
      } else if (error.code === "auth/wrong-password") {
        setError("Mot de passe incorrect.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de gestion de la connexion via Google
  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await signInWithGoogle(); // Connexion via Google
      console.log("Connexion Google réussie :", user);

      // Sauvegarder l'utilisateur dans Firestore
      await saveUserToFirestore(user);

      // Redirection vers le tableau de bord basé sur le rôle
      router.push(role === "agent" ? "/en/dashboard/agent" : "/en/dashboard/client");
    } catch (error) {
      console.error("Erreur lors de la connexion Google :", error);
      setError("Une erreur s'est produite lors de la connexion avec Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      {/* <Header /> */}
      <div
        className="min-h-[90vh] flex items-center bg-contain bg-center justify-center bg-gray-100"
        // style={{ backgroundImage: 'url("/images/200.png")' }}
      >
        <div>
          <form
            onSubmit={handleLogin}
            className="space-y-4 flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-96"
          >
            <CircleUserRound className="text-center text-teal-400" size={90} />
            <h1 className="text-2xl font-bold text-center">Log in</h1>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <input
              type="email"
              placeholder="E-mail"
              className="border p-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Sélecteur de rôle
            <div className="w-full">
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">
                Rôle :
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="client">Client</option>
                <option value="agent">Agent</option>
              </select>
            </div> */}

            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log in"}
            </button>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded w-full mt-2"
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login with Google"}
              </button>
            </div>
          </form> 
          <div className="flex justify-between">
            <Link href={"/auth/signup"} className="underline text-teal-500">
            New here ? SIGN UP
            </Link>
            <Link href={"#"} className="underline text-teal-500" >
            Forgot password
            </Link> 
          </div>
        </div>
        
      </div>
    </div>
  );
}
