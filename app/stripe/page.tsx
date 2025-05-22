"use client";
import React, { useState } from "react";
import { useStripeConnect } from "@/hooks/useStripeConnect";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

export default function Home() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [onboardingExited, setOnboardingExited] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState<string | undefined>();

  const stripeConnectInstance = useStripeConnect(connectedAccountId);

  const handleAccountCreation = async () => {
    try {
      setAccountCreatePending(true);
      setError(false);

      const response = await fetch("/api/account", { method: "POST" });
      const json = await response.json();

      if (json.account) {
        setConnectedAccountId(json.account);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error creating account:", err);
      setError(true);
    } finally {
      setAccountCreatePending(false);
    }
  };

  return (
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
        </div>
      </div>
    </div>
  );
}
