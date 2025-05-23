import { NextResponse } from 'next/server';

export async function POST(request) {
  const { connectedAccountId, line_items, application_fee_amount, success_url, cancel_url } = await request.json();

  if (!connectedAccountId) {
    return NextResponse.json({ error: 'Missing connectedAccountId' }, { status: 400 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe secret key not set' }, { status: 500 });
  }

  const Stripe = require('stripe');
  const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

  try {
    const session = await stripe.checkout.sessions.create(
      {
        line_items,
        payment_intent_data: {
          application_fee_amount,
        },
        mode: 'payment',
        success_url,
        cancel_url,
      },
      {
        stripeAccount: connectedAccountId,
      }
    );
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}