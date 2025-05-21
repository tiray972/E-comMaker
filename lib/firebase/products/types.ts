export type Product = {
  title: string;
  description: string;
  slug: string;
  shopId: string;
  categoryId: string;
  price: number;
  discount?: number;
  images?: string[];
  stock: number;
  tags?: string[];
  status: "active" | "draft" | "archived";
  createdAt?: any; // Timestamp
  variants?: any[]; // À typer selon ta gestion des variantes
};