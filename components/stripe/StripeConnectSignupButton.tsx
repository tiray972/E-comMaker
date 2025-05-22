'use client';

import { useState } from 'react';

interface StripeConnectSignupButtonProps {
  onAccountCreated?: (accountId: string) => void;
}

export function StripeConnectSignupButton({ onAccountCreated }: StripeConnectSignupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/account', { method: 'POST' });
      const data = await res.json();
      if (data.account) {
        if (onAccountCreated) onAccountCreated(data.account);
      } else {
        setError('Erreur lors de la création du compte Stripe.');
      }
    } catch (err) {
      setError('Erreur lors de la création du compte Stripe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSignup}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Création en cours...' : 'Inscrire un compte Stripe Connect'}
      </button>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
}



// utisation dans une page annexxe
// import { StripeConnectSignupButton } from '@/components/stripe/StripeConnectSignupButton';
// import { updateUser } from '@/lib/firebase/users'; // adapte le chemin selon ton projet

// export default function Page({ user }) {
//   // user.uid doit être disponible ici

//   const handleAccountCreated = async (accountId: string) => {
//     // Met à jour l'utilisateur dans Firestore avec l'accountId Stripe
//     await updateUser(user.uid, { stripeAccountId: accountId });
//     alert('Compte Stripe créé et enregistré !');
//   };

//   return (
//     <div>
//       <h2>Inscription Stripe Connect</h2>
//       <StripeConnectSignupButton onAccountCreated={handleAccountCreated} />
//     </div>
//   );
// }