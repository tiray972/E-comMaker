'use client';

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export default function Home() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [onboardingExited, setOnboardingExited] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState<string | undefined>();

  const stripeConnectInstance = useStripeConnect(connectedAccountId);
>>>>>>> a3f155e (update stripe)
=======
import { useEffect, useState } from 'react';
import { StripeConnectSignupButton } from '@/components/stripe/StripeConnectSignupButton';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getShop, updateShopStripeStatus } from '@/lib/firebase/shops';
import { useStripeConnect } from '@/hooks/useStripeConnect';
import type { Shop } from '@/lib/firebase/shops/types';

<<<<<<< HEAD
export default function Page() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
>>>>>>> 3f2027a (	modified:   app/stripe/page.tsx)
=======
export default function StripePage() {
  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize Stripe Connect if we have an account ID
  const stripeConnect = useStripeConnect(shop?.stripeAccountId);
>>>>>>> ba9caa9 (push)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ba9caa9 (push)
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
<<<<<<< HEAD
=======
    <div className="container">
      <div className="banner">
        <h2>Environnement de test par défaut</h2>
      </div>

      <div className="content">
        {!connectedAccountId && (
          <>
            <h2>Get ready for take off</h2>
            <p>
              Environnement de test par défaut is the world's leading air travel platform:
              join our team of pilots to help people travel faster.
            </p>
            <button onClick={handleAccountCreation} disabled={accountCreatePending}>
              {accountCreatePending ? "Creating account..." : "Sign up"}
            </button>
          </>
        )}

        {connectedAccountId && !stripeConnectInstance && (
          <h2>Chargement du formulaire Stripe...</h2>
        )}

        {stripeConnectInstance && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding onExit={() => setOnboardingExited(true)} />
          </ConnectComponentsProvider>
        )}

        {error && <p className="error">❌ Une erreur est survenue.</p>}

        {(connectedAccountId || accountCreatePending || onboardingExited) && (
          <div className="dev-callout">
            {connectedAccountId && (
              <p>
                Connected account ID : <code className="bold">{connectedAccountId}</code>
              </p>
            )}
            {accountCreatePending && <p>Creating a connected account...</p>}
            {onboardingExited && <p>Le formulaire Stripe a été quitté.</p>}
          </div>
        )}

        <div className="info-callout">
          <p>
            Ceci est une démo de l'intégration du formulaire onboarding Stripe Connect.
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=embedded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir la documentation
            </a>
          </p>
>>>>>>> a3f155e (update stripe)
=======
>>>>>>> ba9caa9 (push)
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-600">
            Connect a Stripe account to start accepting payments for {shop.name}.
          </p>
          <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
        </div>
      )}
<<<<<<< HEAD
=======
    <div>
      <h2>Inscription Stripe Connect</h2>
      <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
>>>>>>> 3f2027a (	modified:   app/stripe/page.tsx)
=======
>>>>>>> ba9caa9 (push)
    </div>
  );
}