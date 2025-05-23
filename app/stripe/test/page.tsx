'use client';

import React, { useState } from 'react';

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTest = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectedAccountId: 'acct_1RRZVePr6yLz3vxE',
          line_items: [
            {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: 'Test Produit',
                },
                unit_amount: 1000, // 10.00€
              },
              quantity: 1,
            },
          ],
          application_fee_amount: 200, // 2.00€ de commission
          success_url: `${window.location.origin}/stripe/test?success=1`,
          cancel_url: `${window.location.origin}/stripe/test?canceled=1`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur lors de la création de la session Stripe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Test Paiement Stripe Connect</h2>
      <button
        onClick={handleTest}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          background: '#635BFF',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Redirection...' : 'Payer 10€'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}