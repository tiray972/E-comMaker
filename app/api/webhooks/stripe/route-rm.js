import { NextResponse } from 'next/server';
import { updateShopStripeStatus } from '@/lib/firebase/shops';
import { stripe } from '@/lib/stripe'; // ton client Stripe

// Stripe recommande d'utiliser le body brut pour vérifier la signature
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // à définir dans .env.local

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe secret or webhook secret not set' }, { status: 500 });
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require('stripe');
  const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

  const rawBody = await request.arrayBuffer();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Traite ici les événements Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // ...traitement (ex: mettre à jour Firestore)
  } else if (event.type === 'account.updated') {
    const account = event.data.object;
    // Met à jour le shop en base
    await updateShopStripeStatus(account.metadata.shopId, {
      accountId: account.id,
      status: account.charges_enabled ? 'active' : 'pending',
      details: {
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        requirementsDisabled: account.requirements.disabled_reason === null,
        detailsSubmitted: account.details_submitted,
      }
    });
  }

  return NextResponse.json({ received: true });
}