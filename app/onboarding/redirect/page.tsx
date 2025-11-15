// app/onboarding/redirect/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function StripeRedirectPage() {
  const router = useRouter();
  const params = useSearchParams();

  const status = params.get("status");
  const accountId = params.get("accountId");

  useEffect(() => {
    if (!accountId) {
      router.push("/dashboard");
      return;
    }

    const updateStatus = async () => {
      const res = await fetch(`/api/stripe/sync-account`, {
        method: "POST",
        body: JSON.stringify({ accountId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!data.shopId) {
        router.push("/dashboard");
        return;
      }

      router.push(`/dashboard/${data.shopId}/payments?onboarding=${status}`);
    };

    updateStatus();
  }, [accountId, status, router]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-bold">Mise à jour Stripe...</h1>
      <p className="text-gray-500 mt-3">Un instant...</p>
    </div>
  );
}
