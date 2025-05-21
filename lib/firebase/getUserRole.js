import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebase";

export async function getUserRole() {
  const user = auth.currentUser;
  console.log("ffff",user)
  if (!user) return "client"; // Si non connecté, par défaut "client"

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.role || "client"; // Récupère le rôle ou utilise "client" par défaut
    }
    return "client";
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle :", error);
    return "client";
  }
}
