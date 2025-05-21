export type Shop = {
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  slug: string;
  createdAt?: any; // Timestamp
  isActive: boolean;
  socialLinks?: Record<string, string>;
  customDomain?: string;
};