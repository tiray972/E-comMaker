import { NextResponse } from "next/server";
import Stripe from "stripe";
import { admin } from "@/lib/firebase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { shopId, userEmail } = await req.json();

    if (!shopId || !userEmail) {
      return NextResponse.json(
        { error: "shopId et userEmail sont requis" },
        { status: 400 }
      );
    }

    // Créer un compte EXPRESS Stripe avec metadata shopId
    const account = await stripe.accounts.create({
      type: "standard",
      country: "FR",
      email: userEmail,
      metadata: { shopId },
    });

    // Enregistrer l'accountId dans Firestore (admin SDK)
    await admin.firestore()
      .collection("shops")
      .doc(shopId)
      .update({
        stripeAccountId: account.id,
        stripeAccountStatus: "pending",
        stripeAccountDetails: {
          chargesEnabled: false,
          payoutsEnabled: false,
          requirementsDisabled: false,
          detailsSubmitted: false,
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return NextResponse.json({ accountId: account.id });
  } catch (error: any) {
    console.error("Stripe create-account error:", error);
    return NextResponse.json(
      { error: error.message || "Erreur interne Stripe" },
      { status: 500 }
    );
  }
}
