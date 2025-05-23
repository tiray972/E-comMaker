export type Shop = {
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  stripeAccountId?: string;
  slug: string;
  createdAt?: any; // Timestamp
  isActive: boolean;
  socialLinks?: Record<string, string>;
  customDomain?: string;
  stripeAccountStatus?: 'pending' | 'active' | 'restricted' | 'rejected';
  stripeAccountDetails?: {
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    requirementsDisabled: boolean;
    detailsSubmitted: boolean;
  };
};