import { getStripe } from '@/lib/utils';

export async function POST(request) {
  const stripe = getStripe();
  const { account } = await request.json();

  try {
    const session = await stripe.accountSessions.create({
      account,
      components: {
        account_onboarding: { enabled: true },
      },
    });

    return Response.json({ client_secret: session.client_secret });
  } catch (error) {
    console.error("Stripe accountSession error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
