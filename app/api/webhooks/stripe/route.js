import { NextResponse } from 'next/server';

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

  // Traite ici les événements Stripe (exemple : paiement réussi)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // ...traitement (ex: mettre à jour Firestore)
  }

  return NextResponse.json({ received: true });
}