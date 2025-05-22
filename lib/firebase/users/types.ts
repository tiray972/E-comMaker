export type AppUser = {
  uid: string;
  email: string;
  role: "admin" | "seller" | "customer";
  displayName: string;
  username: string; // Ajout du champ username
  avatarUrl?: string;
  createdAt?: any; // Timestamp
  shopId?: string;
};