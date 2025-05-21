export type User = {
  uid: string;
  email: string;
  role: "admin" | "seller" | "customer";
  displayName: string;
  avatarUrl?: string;
  createdAt?: any; // Timestamp
  shopId?: string;
};