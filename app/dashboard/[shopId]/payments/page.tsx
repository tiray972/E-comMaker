// app/dashboard/[shopId]/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
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
import { StripeConnectSignupButton } from '@/components/stripe/StripeConnectSignupButton';
import { useStripeConnect } from '@/hooks/useStripeConnect';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { Shop } from '@/lib/firebase/shops/types';

export default function paiementPage() {
  const params = useParams();
  const shopId = typeof params?.shopId === 'string' ? params.shopId : '';
  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  // Stripe Connect hook
  const stripeConnect = useStripeConnect(shop?.stripeAccountId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const shopData = await getShop(shopId);
        if (shopData) {
          setShop(shopData as Shop);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [shopId]);

  const handleAccountCreated = async (accountId: string) => {
    if (!user || !shop) return;
    await updateShopStripeStatus(shopId, {
      accountId,
      status: 'pending',
      details: {
        chargesEnabled: false,
        payoutsEnabled: false,
        requirementsDisabled: false,
        detailsSubmitted: false
      }
    });
    setShop(prev => prev ? {
      ...prev,
      stripeAccountId: accountId,
      stripeAccountStatus: 'pending'
    } : null);
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
          <main className="p-6">
            {/* Résumé configuration dynamique */}
            <Card className="mb-6">
              <CardContent className="flex flex-wrap gap-6 items-center">
                <div>
                  <span className="font-bold">✅ Paiements connectés :</span> {shop.stripeAccountId ? 1 : 0} / 1
                </div>
                <div>
                  <span className="font-bold">🚚 Zones de livraison actives :</span> {shop.shippingZones ? shop.shippingZones.length : 0}
                </div>
                <div>
                  <span className="font-bold">💶 TVA :</span> {shop.taxRate ? shop.taxRate + ' %' : 'Non défini'}
                </div>
                <div>
                  <span className="font-bold">💱 Devise :</span> {shop.currency || 'EUR'}
                </div>
              </CardContent>
            </Card>
            {/* Moyens de paiement dynamiques */}
            <Card>
              <CardHeader>
                <CardTitle>Moyens de paiement</CardTitle>
                <CardDescription>Connecte et configure tes passerelles de paiement.</CardDescription>
              </CardHeader>
              <CardContent>
                {shop.stripeAccountId ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                      <p>Votre compte Stripe est connecté !</p>
                      <p className="text-sm mt-1">Statut : {shop.stripeAccountStatus}</p>
                    </div>
                    <Button
                      onClick={() => { if (stripeConnect) stripeConnect.open(); }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Mettre à jour le compte Stripe
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4 text-gray-600">
                      Connecte un compte Stripe pour commencer à accepter les paiements sur {shop.name}.
                    </p>
                    <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
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
