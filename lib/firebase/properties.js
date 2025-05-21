import { doc, addDoc, collection, updateDoc, arrayUnion, getDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebase";
import { sendAdminNotifications } from "@/components/Notif/sendAdminNotifications";

// Ajouter une propriété pour l'agent
export async function addPropertyForAgent(property) {
  const user = auth.currentUser;

  if (!user) return alert("Please log in.");

  try {
    // Ajouter la propriété à la collection `properties`
    const propertyRef = await addDoc(collection(db, "properties"), {
      ...property,
      agentId: user.uid,
    });

    // Mettre à jour la liste des propriétés de l'agent
    const agentRef = doc(db, "users", user.uid);
    await updateDoc(agentRef, {
      properties: arrayUnion(propertyRef.id), // Ajout de l'ID de la nouvelle propriété
    });

    alert("Successfully added! It will be reviewed within 48 hours by our team.");
    notifyAdmins();
  } catch (error) {
    console.error("Error adding property: ", error);
  }
}

// Récupérer les propriétés de l'agent
export async function fetchAgentProperties() {
  const user = auth.currentUser; // Récupère l'utilisateur actuellement connecté
  if (!user) return alert("Please log in.");

  try {
    // Requête pour récupérer les propriétés basées sur l'agentId
    const q = query(collection(db, "properties"), where("agentId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    // Créez une liste des propriétés avec leurs données et ID
    const propertyList = querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID unique de la propriété
      ...doc.data(), // Données de la propriété
    }));

    return propertyList; // Retourne la liste des propriétés
  } catch (error) {
    console.error("Error fetching properties: ", error);
  }
}

// Récupérer les favoris du client
export async function fetchClientFavorites() {
  const user = auth.currentUser;
  if (!user) return alert("Please log in as a client.");

  try {
    // Récupérer le document du client
    const clientRef = doc(db, "users", user.uid);
    const clientSnap = await getDoc(clientRef);

    if (clientSnap.exists()) {
      const { favorites } = clientSnap.data();

      // Vérifier si le champ `favorites` existe et est un tableau
      if (Array.isArray(favorites) && favorites.length > 0) {
        // Récupérer toutes les propriétés favorites
        const q = query(collection(db, "properties"), where("__name__", "in", favorites));
        const querySnapshot = await getDocs(q);

        const favoriteList = querySnapshot.docs.map((doc) => ({
          id: doc.id,  // Ajout de l'ID de la propriété
          ...doc.data() // Récupération des données de la propriété
        }));

        return favoriteList;  // Retourner la liste des propriétés favorites
      } else {
        console.log("Aucun favori trouvé pour ce client.");
      }
    } else {
      console.log("Aucun document client trouvé.");
    }
  } catch (error) {
    console.error("Error fetching favorites: ", error);
  }
}
async function notifyAdmins() {
  const title = "Nouvelle location ajoutée";
  const message = "Une nouvelle location vient d'être ajoutée sur la plateforme.";
  const additionalData = {
    locationId: "12345",
    addedBy: "userId",
  };

  try {
    await sendAdminNotifications(title, message, additionalData);
    console.log("Notification envoyée aux admins.");
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
  }
}

// Récupérer toutes les propriétés triées par date d'ajout
export async function fetchAllProperties() {
  try {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return properties;
  } catch (error) {
    console.error("Erreur lors de la récupération des propriétés :", error);
    return [];
  }
}


export async function verifyProperty(propertyId) {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    await updateDoc(propertyRef, { isverified: true });
    alert("Property has been verified!");
  } catch (error) {
    console.error("Error verifying property:", error);
    alert("Failed to verify the property. Please try again.");
  }
}

export async function deleteProperty(propertyId) {
  try {
    const propertyRef = doc(db, "properties", propertyId);
    await updateDoc(propertyRef, { isverified: false , delete:true });
    alert("Property has been verified!");
  } catch (error) {
    console.error("Error verifying property:", error);
    alert("Failed to verify the property. Please try again.");
  }
}