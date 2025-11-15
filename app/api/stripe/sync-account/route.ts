import { NextResponse } from "next/server";
import Stripe from "stripe";
import { admin } from "@/lib/firebase/admin";
import { FieldValue } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { accountId } = await req.json();

    if (!accountId) {
      return NextResponse.json({ error: "accountId requis" }, { status: 400 });
    }

    const account = await stripe.accounts.retrieve(accountId);
    const shopId = account.metadata.shopId;

    if (!shopId) {
      return NextResponse.json({ error: "shopId manquant dans metadata Stripe" }, { status: 400 });
    }

    await admin.firestore()
      .collection("shops")
      .doc(shopId)
      .update({
        stripeAccountStatus: account.details_submitted && account.charges_enabled ? "active" : "pending",
        stripeAccountDetails: {
          chargesEnabled: account.charges_enabled,
          payoutsEnabled: account.payouts_enabled,
          requirementsDisabled: account.requirements.disabled_reason === null,
          detailsSubmitted: account.details_submitted,
        },
        updatedAt: FieldValue.serverTimestamp(),
      });

    return NextResponse.json({ ok: true, shopId });
  } catch (err: any) {
    console.error("Stripe sync error:", err);
    return NextResponse.json({ error: "Failed to sync Stripe" }, { status: 500 });
  }
}
