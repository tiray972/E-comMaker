export type Payment = {
  orderId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  provider: string;
  paymentDate?: any; // Timestamp
  transactionId: string;
};