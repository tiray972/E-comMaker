'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DashboardHeader from '@/components/dashboard/header';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardAuthWrapper from '@/app/dashboard/[shopId]/DashboardAuthWrapper';
import { getShop, updateShopStripeStatus } from '@/lib/firebase/shops';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { Shop } from '@/lib/firebase/shops/types';

export default function PaymentMethodsPage() {
  const params = useParams();
  const shopId = typeof params?.shopId === 'string' ? params.shopId : '';

  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const shopData = await getShop(shopId);
        if (shopData) setShop(shopData as Shop);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [shopId]);

  const createOnboardingLink = async (accountId: string) => {
    const res = await fetch('/api/stripe/create-onboarding-link', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const handleAccountCreated = async () => {
    if (!user) return;

    const res = await fetch('/api/stripe/create-account', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopId, userEmail: user.email }),
    });

    const data = await res.json();
    if (!data.accountId) return;

    await updateShopStripeStatus(shopId, {
      accountId: data.accountId,
      status: "pending",
      details: { chargesEnabled: false, payoutsEnabled: false, detailsSubmitted: false },
    });

    setShop(prev => prev
      ? { ...prev, stripeAccountId: data.accountId, stripeAccountStatus: "pending", stripeAccountDetails: { chargesEnabled: false, payoutsEnabled: false, detailsSubmitted: false } }
      : null
    );

    createOnboardingLink(data.accountId);
  };

  const handleDisconnect = async () => {
    if (!shop?.stripeAccountId) return;

    await updateShopStripeStatus(shopId, { accountId: "", status: "disconnected", details: null });
    setShop(prev => prev ? { ...prev, stripeAccountId: null, stripeAccountStatus: "disconnected", stripeAccountDetails: null } : null);
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div className="p-8">Veuillez vous connecter pour gérer les paiements.</div>;
  if (!shop) return <div className="p-8">Vous devez créer une boutique avant de connecter Stripe.</div>;

  return (
    <DashboardAuthWrapper shop={{ ...shop, createdAt: shop.createdAt }}>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6 space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle>Moyens de paiement</CardTitle>
                <CardDescription>Connecte et configure tes passerelles de paiement.</CardDescription>
              </CardHeader>
              <CardContent>
                {!shop.stripeAccountId && (
                  <Button
                    onClick={handleAccountCreated}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Connecter Stripe
                  </Button>
                )}

                {shop.stripeAccountId && shop.stripeAccountStatus === 'pending' && (
                  <div className="space-y-2">
                    <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                      ⚠ Votre compte Stripe est en cours de configuration.
                    </div>
                    <Button
                      onClick={() => createOnboardingLink(shop.stripeAccountId!)}
                      className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                    >
                      Continuer l’onboarding
                    </Button>
                  </div>
                )}

                {shop.stripeAccountId && shop.stripeAccountStatus === 'active' && (
                  <div className="space-y-2">
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                      ✅ Votre compte Stripe est actif.
                    </div>
                    <Button
                      onClick={() => createOnboardingLink(shop.stripeAccountId!)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Mettre à jour les infos Stripe
                    </Button>
                    <Button
                      onClick={handleDisconnect}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Délier le compte
                    </Button>
                  </div>
                )}

                {shop.stripeAccountStatus === 'disconnected' && (
                  <div className="p-4 bg-gray-50 text-gray-700 rounded-lg">
                    ❌ Aucun compte Stripe connecté.
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </DashboardAuthWrapper>
  );
}
