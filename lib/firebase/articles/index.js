import { 
    collection, 
    getDocs, 
    query, 
    where, 
    doc, 
    setDoc, 
    getDoc 
  } from "firebase/firestore";
  import { db } from "@/lib/firebase/firebase";
  
  // Récupérer tous les articles
  export async function getAllArticles() {
    try {
      const articlesRef = collection(db, "articles");
      const snapshot = await getDocs(articlesRef);
      const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return articles;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  }
  
  // Récupérer un article par slug
  export async function getArticleBySlug(slug) {
    try {
      const articlesRef = collection(db, "articles");
      const q = query(articlesRef, where("slug", "==", slug));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        console.warn(`Aucun article trouvé pour le slug : ${slug}`);
        return null;
      }
  
      const article = snapshot.docs[0];
      return { id: article.id, ...article.data() };
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article "${slug}" :`, error);
      return null;
    }
  }
  
  // Ajouter un nouvel article
  /**
   * Ajoute un nouvel article à Firestore.
   * @param {Object} article - Les données de l'article à ajouter.
   * @param {string} article.slug - Le slug unique de l'article.
   * @param {string} article.title - Le titre de l'article.
   * @param {string} article.content - Le contenu de l'article.
   * @param {string} article.featuredImage - URL de l'image principale de l'article.
   * @param {string} article.author - L'auteur de l'article.
   * @param {string} article.publishedDate - La date de publication (au format ISO 8601).
   * @returns {boolean} - Indique si l'ajout a réussi ou échoué.
   */
  export async function addArticle(article) {
    try {
      // Vérification si le slug est déjà utilisé
      const articleRef = doc(db, "articles", article.slug);
      const existingArticle = await getDoc(articleRef);
  
      if (existingArticle.exists()) {
        console.warn(`Un article avec le slug "${article.slug}" existe déjà.`);
        return { success: false, message: "Slug déjà utilisé." };
      }
  
      // Ajout de l'article
      await setDoc(articleRef, {
        ...article,
        createdAt: new Date().toISOString(), // Ajouter la date de création
      });
  
      console.log(`Article "${article.title}" ajouté avec succès !`);
      return { success: true, message: "Article ajouté avec succès !" };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      return { success: false, message: "Erreur lors de l'ajout de l'article." };
    }
  }
  