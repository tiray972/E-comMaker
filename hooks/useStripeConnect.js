import { useState, useEffect } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";

export const useStripeConnect = (connectedAccountId) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState();

  useEffect(() => {
    if (!connectedAccountId) return;

    const initialize = async () => {
      try {
        const fetchClientSecret = async () => {
          const response = await fetch("/api/account_session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ account: connectedAccountId }),
          });

          if (!response.ok) {
            const { error } = await response.json();
            throw new Error(`An error occurred: ${error}`);
          }

          const { client_secret: clientSecret } = await response.json();
          return clientSecret;
        };

        const connectInstance = await loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
          fetchClientSecret,
          appearance: {
            overlays: "dialog",
            variables: {
              colorPrimary: "#635BFF",
            },
          },
        });

        setStripeConnectInstance(connectInstance);
      } catch (error) {
        console.error("Stripe Connect initialization error:", error);
      }
    };

    initialize();
  }, [connectedAccountId]);

  return stripeConnectInstance;
};
