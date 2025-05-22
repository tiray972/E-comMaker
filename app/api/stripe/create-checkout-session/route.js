import { NextResponse } from 'next/server';

export async function POST(request) {
  const { connectedAccountId, line_items, application_fee_amount, success_url, cancel_url } = await request.json();
<<<<<<< HEAD
<<<<<<< HEAD
  if (!connectedAccountId) {
    return NextResponse.json({ error: 'Missing connectedAccountId' }, { status: 400 });
  }
  
=======

  if (!connectedAccountId) {
    return NextResponse.json({ error: 'Missing connectedAccountId' }, { status: 400 });
  }

>>>>>>> b1f8a01 (stripe 2mepart not finish)
=======
  if (!connectedAccountId) {
    return NextResponse.json({ error: 'Missing connectedAccountId' }, { status: 400 });
  }
  
>>>>>>> a3f155e (update stripe)
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe secret key not set' }, { status: 500 });
  }
<<<<<<< HEAD
<<<<<<< HEAD
  
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require('stripe');
  const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
  
  try {
    console.log('connectedAccountId', connectedAccountId);
=======

=======
  
>>>>>>> a3f155e (update stripe)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require('stripe');
  const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
  
  try {
<<<<<<< HEAD
>>>>>>> b1f8a01 (stripe 2mepart not finish)
=======
    console.log('connectedAccountId', connectedAccountId);
>>>>>>> a3f155e (update stripe)
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
<<<<<<< HEAD
<<<<<<< HEAD
    return NextResponse.json({ error: error.message,ray:"gg" }, { status: 500 });
=======
    return NextResponse.json({ error: error.message }, { status: 500 });
>>>>>>> b1f8a01 (stripe 2mepart not finish)
=======
    return NextResponse.json({ error: error.message,ray:"gg" }, { status: 500 });
>>>>>>> a3f155e (update stripe)
  }
}