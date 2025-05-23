'use client';

import { useEffect, useState } from 'react';
import { StripeConnectSignupButton } from '@/components/stripe/StripeConnectSignupButton';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getShop, updateShopStripeStatus } from '@/lib/firebase/shops';
import { useStripeConnect } from '@/hooks/useStripeConnect';
import type { Shop } from '@/lib/firebase/shops/types';

export default function StripePage() {
  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize Stripe Connect if we have an account ID
  const stripeConnect = useStripeConnect(shop?.stripeAccountId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch the shop owned by this user
        const shopData = await getShop(firebaseUser.uid);
        if (shopData) {
          setShop(shopData as Shop);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAccountCreated = async (accountId: string) => {
    if (!user || !shop) return;
    
    await updateShopStripeStatus(user.uid, {
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

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8">Please log in to connect your Stripe account.</div>;
  }

  if (!shop) {
    return <div className="p-8">You need to create a shop before connecting Stripe.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Stripe Connect Integration</h1>
      
      {shop.stripeAccountId ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            <p>Your shop's Stripe account is connected!</p>
            <p className="text-sm mt-1">Status: {shop.stripeAccountStatus}</p>
          </div>
          <button
            onClick={() => {
              if (stripeConnect) {
                stripeConnect.open();
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Update Account Settings
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-600">
            Connect a Stripe account to start accepting payments for {shop.name}.
          </p>
          <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
        </div>
      )}
    </div>
  );
}