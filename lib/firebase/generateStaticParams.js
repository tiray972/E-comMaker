import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));

    return properties.map((property) => ({ id: property.id }));
  } catch (error) {
    console.error("Erreur lors de la génération des paramètres :", error);
    return [];
  }
}
