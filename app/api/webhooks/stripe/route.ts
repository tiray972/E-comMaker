import { NextRequest } from 'next/server';
import { updateShopStripeStatus } from '@/lib/firebase/shops';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const buf = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'account.updated') {
    const account = event.data.object as Stripe.Account;
    const shopId = account.metadata?.shopId;
    if (shopId) {
      await updateShopStripeStatus(shopId, {
        accountId: account.id,
        status: account.charges_enabled ? 'active' : 'pending',
        details: {
          chargesEnabled: account.charges_enabled,
          payoutsEnabled: account.payouts_enabled,
          requirementsDisabled: account.requirements.disabled_reason === null,
          detailsSubmitted: account.details_submitted,
        },
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}