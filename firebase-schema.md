# 📦 Firebase Firestore Schema - BtoBtoC E-commerce (Type Shopify)

## ⚙️ Introduction
Cette structure est pensée pour un système de boutique en ligne multi-utilisateur (vendeurs & clients), permettant :
- Gestion de produits
- Gestion de vendeurs
- Gestion de clients
- Commandes
- Paiements
- Catégories
- Options produits
- Stock
- Statistiques

---

## 📁 Collections Firestore

### 1. `users` 👤
> Gère tous les utilisateurs (admin, vendeurs, clients)

**Champs recommandés :**
- `uid`: string (auth ID)
- `email`: string
- `role`: string (`admin`, `seller`, `customer`)
- `displayName`: string
- `avatarUrl`: string
- `createdAt`: timestamp
- `shopId`: string (lié à `shops`, pour vendeurs)

---

### 2. `shops` 🏪
> Une boutique par vendeur

**Champs recommandés :**
- `name`: string
- `description`: string
- `logoUrl`: string
- `ownerId`: string (UID du vendeur)
- `slug`: string (URL friendly)
- `createdAt`: timestamp
- `isActive`: boolean
- `socialLinks`: map
-   `slug`: string "my-boutique"
- `customDomain`: string "boutiqueuser.com"
---

### 3. `products` 📦
> Produits vendus sur la plateforme

**Champs recommandés :**
- `title`: string
- `description`: string
- `slug`: string
- `shopId`: string (référence à `shops`)
- `categoryId`: string
- `price`: number
- `discount`: number
- `images`: array
- `stock`: number
- `tags`: array of strings
- `status`: string (`active`, `draft`, `archived`)
- `createdAt`: timestamp
- `variants`: array (si géré inline) ou sous-collection

---

### 4. `categories` 🗂️
> Organisation des produits

**Champs recommandés :**
- `name`: string
- `slug`: string
- `parentId`: string | null
- `icon`: string
- `image`: string

---

### 5. `orders` 🧾
> Commandes passées

**Champs recommandés :**
- `userId`: string (client)
- `shopId`: string (vendeur)
- `products`: array of objects (productId, quantity, price)
- `totalAmount`: number
- `status`: string (`pending`, `paid`, `shipped`, `delivered`, `cancelled`)
- `paymentStatus`: string
- `shippingAddress`: map
- `billingAddress`: map
- `createdAt`: timestamp

---

### 6. `payments` 💳
> Suivi des paiements

**Champs recommandés :**
- `orderId`: string
- `amount`: number
- `status`: string (`pending`, `completed`, `failed`)
- `provider`: string (Stripe, PayPal, etc.)
- `paymentDate`: timestamp
- `transactionId`: string

---

### 7. `reviews` ⭐
> Avis clients sur les produits

**Champs recommandés :**
- `productId`: string
- `userId`: string
- `rating`: number (1–5)
- `comment`: string
- `createdAt`: timestamp

---

### 8. `carts` 🛒 *(optionnel pour checkout rapide)*
> Panier temporaire de l’utilisateur

**Champs recommandés :**
- `userId`: string
- `items`: array (productId, quantity, price)
- `updatedAt`: timestamp

---

### 9. `analytics` 📊
> Statistiques de vente et de trafic

**Champs recommandés :**
- `shopId`: string
- `date`: timestamp
- `visits`: number
- `orders`: number
- `revenue`: number

---

### 10. `discounts` 🎟️
> Codes promo

**Champs recommandés :**
- `code`: string
- `type`: string (`percentage`, `fixed`)
- `value`: number
- `expirationDate`: timestamp
- `usageLimit`: number
- `shopId`: string | null
- `appliesTo`: array of productIds | null

---

### 11. `settings` ⚙️
> Config globale (multi-tenant ou plateforme)

**Champs recommandés :**
- `platformName`: string
- `theme`: string
- `defaultCurrency`: string
- `maintenanceMode`: boolean
- `supportEmail`: string

---

## 🧱 Sous-collections utiles

### `products/{productId}/variants`
- `title`: string (ex: "Taille L")
- `sku`: string
- `price`: number
- `stock`: number
- `attributes`: map

---

## ✅ Sécurité & Règles
- Utiliser `custom claims` dans Firebase Auth pour les rôles (`admin`, `seller`, `customer`)
- Mettre en place des règles Firestore basées sur le rôle et ownership (`shopId === user.shopId`)

---

## ✨ Tips
- Utiliser Cloud Functions pour gérer les paiements (Stripe Webhook)
- Utiliser Firestore Triggers pour stock auto, analytics, e-mails
- Gérer le stockage images avec Firebase Storage
