# 🗺️ Sitemap - E-commerce BtoBtoC

## 🌐 Pages Publiques

- `/` – Accueil
- `/login` – Connexion
- `/register` – Inscription
- `/about` – À propos
- `/contact` – Contact
- `/terms` – CGU / CGV
- `/privacy` – Politique de confidentialité

---

## 🏬 Navigation Boutique

- `/shop/:shopSlug` – Page boutique du vendeur
  - `/shop/:shopSlug/products` – Liste des produits
  - `/shop/:shopSlug/about` – Présentation du vendeur (optionnel)

- `/product/:productId` – Page produit
- `/category/:categorySlug` – Produits par catégorie
- `/search?q=` – Résultats de recherche

---

## 🛒 Parcours Client

- `/cart` – Panier
- `/checkout` – Validation commande
- `/checkout/success` – Confirmation commande
- `/checkout/failure` – Échec paiement (optionnel)

---

## 👤 Espace Client

- `/account` – Tableau de bord client
  - `/account/orders` – Mes commandes
  - `/account/settings` – Paramètres du compte
  - `/account/addresses` – Adresses de livraison
  - `/account/wishlist` – Favoris (optionnel)

---

## 🧑‍💼 Espace Vendeur (Dashboard)

- `/dashboard` – Accueil tableau de bord
- `/dashboard/products` – Liste produits
  - `/dashboard/products/new` – Ajouter un produit
  - `/dashboard/products/:productId/edit` – Modifier un produit

- `/dashboard/orders` – Commandes reçues
- `/dashboard/reviews` – Avis sur les produits
- `/dashboard/settings` – Paramètres boutique
- `/dashboard/analytics` – Statistiques (CA, commandes, etc.)

---

## 👑 Espace Admin (si backoffice prévu)

- `/admin` – Accueil admin
- `/admin/shops` – Gestion des boutiques
- `/admin/users` – Utilisateurs (vendeurs, clients)
- `/admin/products` – Tous les produits
- `/admin/categories` – Catégories produit
- `/admin/orders` – Toutes les commandes
- `/admin/reports` – Export CSV, data

---

## 🧪 Pages Techniques (optionnel)

- `/404` – Page non trouvée
- `/maintenance` – Maintenance temporaire
- `/email-preview/:template` – Aperçu des emails (dev only)

---

## 🔗 API Routes (si besoin d'exposition)

- `/api/checkout` – Paiement Stripe
- `/api/webhooks/stripe` – Webhooks paiements
- `/api/admin/...` – Admin API sécurisée
