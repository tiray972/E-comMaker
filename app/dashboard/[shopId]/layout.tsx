// app/dashboard/[shopId]/layout.tsx
import ServerAuthWrapper from './ServerAuthWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Gérez votre boutique sur le tableau de bord.',
};

export default function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { shopId: string };
}) {
  return (
    <ServerAuthWrapper params={params}>
      {children}
    </ServerAuthWrapper>
  );
}
