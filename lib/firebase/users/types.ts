export type User = {
  uid: string;
  email: string;
  role: "admin" | "seller" | "customer";
  displayName: string;
  username: string; // Ajout du champ username
  avatarUrl?: string;
  createdAt?: any; // Timestamp
  shopIds?: string[]; // Un utilisateur peut être lié à plusieurs boutiques
};