import { getStripe } from '@/lib/utils';

export async function POST(request) {
  const stripe = getStripe();
  try {
    const account = await stripe.accounts.create({});
    return Response.json({ account: account.id });
  } catch (error) {
    console.error('Stripe API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}