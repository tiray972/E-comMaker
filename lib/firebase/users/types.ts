export type User = {
  uid: string;
  email: string;
  role: "admin" | "seller" | "customer";
  displayName: string;
<<<<<<< HEAD
  username: string; // Ajout du champ username
=======
>>>>>>> 19fe231 (push user & shops)
  avatarUrl?: string;
  createdAt?: any; // Timestamp
  shopId?: string;
};