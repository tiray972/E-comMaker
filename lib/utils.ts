import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Fonction pour obtenir Stripe côté serveur
export function getStripe() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require('stripe');
  return new Stripe(stripeKey, { apiVersion: '2023-10-16' });
}