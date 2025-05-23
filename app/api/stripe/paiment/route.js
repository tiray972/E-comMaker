import { NextResponse } from 'next/server';
const Stripe = require('stripe');

export async function POST(request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe secret key not set' }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

  try {
    const { amount, application_fee_amount, destination } = await request.json();

    if (!amount || !application_fee_amount || !destination) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      application_fee_amount,
      transfer_data: {
        destination,
      },
    });

    return NextResponse.json({ paymentIntent });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}