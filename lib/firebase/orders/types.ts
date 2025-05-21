export type Order = {
  userId: string;
  shopId: string;
  products: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentStatus: string;
  shippingAddress: Record<string, any>;
  billingAddress: Record<string, any>;
  createdAt?: any; // Timestamp
};