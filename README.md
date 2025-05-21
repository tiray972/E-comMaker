# 🛒 Architecture E-commerce BtoBtoC (Type Shopify)

## 🔧 Tech Stack

| Élément          | Choix                          |
|------------------|--------------------------------|
| Frontend         | Next.js                        |
| Backend (API)    | Firebase Cloud Functions       |
| Base de données  | Firebase Firestore             |
| Authentification | Firebase Auth                  |
| Stockage         | Firebase Storage               |
| Paiement         | Stripe                         |
| Hébergement      | Vercel / Firebase Hosting      |

---

## 🧱 Modules Fonctionnels

| Module                    | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| 🔐 Authentification        | Login/Signup (client & vendeur), gestion des rôles                         |
| 🏬 Gestion des boutiques   | Chaque vendeur peut créer et gérer sa boutique                             |
| 📦 Produits               | CRUD de produits, variantes, images, catégories                            |
| 🛒 Panier & Checkout      | Panier client, validation commande, sélection livraison & paiement          |
| 💳 Paiement                | Intégration Stripe ou autre provider                                       |
| 📑 Commandes              | Suivi des commandes par client et vendeur                                  |
| ⭐ Avis produits           | Commentaires & notes clients                                               |
| 🧾 Facturation             | Génération de factures PDF (optionnel)                                     |
| 🛠️ Paramètres boutique     | Paramètres personnalisables pour chaque vendeur                            |
| 📊 Statistiques           | Chiffre d'affaires, ventes, vues (Firebase Analytics / BigQuery)           |

---

## 🗃️ Structure Firestore (Collections)

### 👥 `users`
- `uid`
- `role`: `admin` | `seller` | `customer`
- `email`, `name`, `createdAt`
- Lié à une boutique (`seller`)

---

### 🏪 `shops`
- `name`, `slug`, `description`, `logoURL`
- `ownerId` → `users.uid`
- `createdAt`, `active`, `theme`

---

### 🛍️ `products`
- `title`, `description`, `price`, `images`, `inventory`
- `shopId`, `categoryId`
- `variants[]`: ex: tailles, couleurs
- `status`: `draft`, `active`, `archived`
- `createdAt`, `updatedAt`

---

### 🧾 `orders`
- `userId`, `shopId`, `productItems[]`
- `total`, `status`: `pending`, `paid`, `shipped`, `cancelled`
- `shippingAddress`
- `createdAt`, `paymentId`

---

### 💳 `payments`
- `orderId`, `amount`, `provider`, `status`
- `transactionId`, `createdAt`

---

### 🎯 `categories`
- `name`, `slug`, `description`
- `parentCategoryId?`

---

### ⭐ `reviews`
- `userId`, `productId`, `rating`, `comment`
- `createdAt`, `visible`

---

### 🛒 `carts` (optionnel)
- `userId`
- `items[]`: `productId`, `quantity`, `variant`

---

## 🔐 Sécurité & Rôles

### Rôles :
- `admin` : contrôle complet
- `seller` : sa boutique uniquement
- `customer` : achats uniquement

### Claims :
```json
{
  "role": "seller"
}





This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
