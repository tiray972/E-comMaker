'use client';

import { useEffect, useState } from 'react';
import { StripeConnectSignupButton } from '@/components/stripe/StripeConnectSignupButton';
import { updateUser } from '@/lib/firebase/users';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useStripeConnect } from '@/hooks/useStripeConnect';

export default function StripePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stripeAccountId, setStripeAccountId] = useState<string | null>(null);
  
  // Initialize Stripe Connect if we have an account ID
  const stripeConnect = useStripeConnect(stripeAccountId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Check if user has a Stripe account
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.stripeAccountId) {
            setStripeAccountId(userData.stripeAccountId);
          }
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAccountCreated = async (accountId: string) => {
    if (!user) return;
    await updateUser(user.uid, { stripeAccountId: accountId });
    setStripeAccountId(accountId);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8">Please log in to connect your Stripe account.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Stripe Connect Integration</h1>
      
      {stripeAccountId ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            Your Stripe account is connected! Account ID: {stripeAccountId}
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
            Connect your Stripe account to start accepting payments.
          </p>
          <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
        </div>
      )}
    </div>
  );
}