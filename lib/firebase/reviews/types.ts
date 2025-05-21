export type Review = {
  productId: string;
  userId: string;
  rating: number; // 1–5
  comment: string;
  createdAt?: any; // Timestamp
};