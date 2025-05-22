import { getStripe } from '@/lib/utils';


export async function POST(request) {
    const stripe = getStripe();
    try {
    const body = await request.json();
    const accountSession = await stripe.accountSessions.create({
        account: body.account,
        components: {
        account_onboarding: { enabled: true },
        },
    });
    return Response.json({ client_secret: accountSession.client_secret });
    } catch (error) {
    console.error('Stripe API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
    }
}