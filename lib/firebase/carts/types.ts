export type Cart = {
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
  updatedAt?: any; // Timestamp
};