'use client';

import { useEffect, useState } from 'react';
import { StripeConnectSignupButton } from '@/components/stripe/StripeConnectSignupButton';
import { updateUser } from '@/lib/firebase/users';
// Importe ton instance Firebase Auth
import { auth } from '@/lib/firebase/firebase'; // adapte le chemin selon ton projet
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function Page() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAccountCreated = async (accountId: string) => {
    if (!user) return;
    await updateUser(user.uid, { stripeAccountId: accountId });
    alert('Compte Stripe créé et enregistré !');
  };

  return (
    <div>
      <h2>Inscription Stripe Connect</h2>
      <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
    </div>
  );
}