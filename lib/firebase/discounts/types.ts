export type Discount = {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expirationDate?: any; // Timestamp
  usageLimit: number;
  shopId?: string | null;
  appliesTo?: string[] | null; // array of productIds
};