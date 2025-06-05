import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "../firebase"; // import de ta config Firebase
  import type { Theme, Section } from "./types";
  
  // Collection globale des thèmes
  const globalThemesCol = collection(db, "themes");
  
  // Helper pour cloner les sections du thème global, en désactivant par défaut les sections optionnelles
  function cloneSections(sections: Section[]): Section[] {
    return sections.map((section) => ({
      ...section,
      enabled: section.optional ? false : true,
      settings: {}, // reset des settings au clonage
    }));
  }
  
  // Création d'un thème personnalisé dans une boutique
  export async function createTheme(
    shopId: string,
    theme: Omit<Theme, "id" | "createdAt">
  ) {
    const themeRef = doc(collection(db, "shops", shopId, "themes"));
    const newTheme = {
      ...theme,
      createdAt: Timestamp.now(),
      isActive: false,
    };
    await setDoc(themeRef, newTheme);
    return { id: themeRef.id, ...newTheme };
  }
  
  // Récupérer un thème spécifique d'une boutique
  export async function getTheme(
    shopId: string,
    themeId: string
  ): Promise<Theme | null> {
    const themeRef = doc(db, "shops", shopId, "themes", themeId);
    const themeSnap = await getDoc(themeRef);
    if (!themeSnap.exists()) return null;
    return { id: themeSnap.id, ...themeSnap.data() } as Theme;
  }
  
  // Mettre à jour un thème d'une boutique
  export async function updateTheme(
    shopId: string,
    themeId: string,
    data: Partial<Theme>
  ) {
    const themeRef = doc(db, "shops", shopId, "themes", themeId);
    await updateDoc(themeRef, { ...data, updatedAt: Timestamp.now() });
  }
  
  // Supprimer un thème d'une boutique
  export async function deleteTheme(shopId: string, themeId: string) {
    const themeRef = doc(db, "shops", shopId, "themes", themeId);
    await deleteDoc(themeRef);
  }
  
  // Récupérer tous les thèmes personnalisés d'une boutique
  export async function getAllThemes(shopId: string): Promise<Theme[]> {
    const snap = await getDocs(collection(db, "shops", shopId, "themes"));
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Theme));
  }
  
  // Cloner un thème global vers une boutique
  export async function cloneThemeToShop(shopId: string, themeId: string) {
    const baseThemeRef = doc(globalThemesCol, themeId);
    const baseSnap = await getDoc(baseThemeRef);
    if (!baseSnap.exists()) throw new Error("Theme not found");
  
    const baseTheme = baseSnap.data() as Theme;
  
    // Clonage des pages avec sections clonées
    const clonedPages = baseTheme.pages.map((page) => ({
      ...page,
      sections: cloneSections(page.sections),
    }));
  
    const shopThemesCol = collection(db, "shops", shopId, "themes");
    const clonedRef = doc(shopThemesCol);
    const clonedTheme = {
      ...baseTheme,
      pages: clonedPages,
      createdAt: Timestamp.now(),
      isActive: true,
    };
  
    await setDoc(clonedRef, clonedTheme);
    await updateDoc(doc(db, "shops", shopId), {
      activeThemeId: clonedRef.id,
    });
  
    // On enlève l'id du thème cloné pour éviter le doublon
    const { id, ...clonedThemeWithoutId } = clonedTheme;
    return { id: clonedRef.id, ...clonedThemeWithoutId };
  }
  
  // Récupérer le thème actif d'une boutique
  export async function getActiveTheme(shopId: string): Promise<Theme> {
    const shopRef = doc(db, "shops", shopId);
    const shopSnap = await getDoc(shopRef);
    if (!shopSnap.exists()) throw new Error("Boutique introuvable");
  
    const activeThemeId = shopSnap.data()?.activeThemeId;
    if (!activeThemeId) throw new Error("Aucun thème actif défini");
  
    const themeRef = doc(db, "shops", shopId, "themes", activeThemeId);
    const themeSnap = await getDoc(themeRef);
    if (!themeSnap.exists()) throw new Error("Thème actif introuvable");
  
    return { id: themeSnap.id, ...themeSnap.data() } as Theme;
  }
  