// app/dashboard/[shopId]/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DashboardHeader from '@/components/dashboard/header';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardAuthWrapper from '@/app/dashboard/[shopId]/DashboardAuthWrapper';

export default function shippingPage() {
  const { shop } = useAuth();

  const createdAt = shop.createdAt
    ? new Date(shop.createdAt.seconds * 1000).toLocaleDateString()
    : 'Unknown';

  return (
    <DashboardAuthWrapper shop={{ ...shop, createdAt }}>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            {/* Résumé configuration */}
            <Card className="mb-6">
              <CardContent className="flex flex-wrap gap-6 items-center">
                <div>
                  <span className="font-bold">✅ Paiements connectés :</span> 2 / 3
                </div>
                <div>
                  <span className="font-bold">🚚 Zones de livraison actives :</span> 3
                </div>
                <div>
                  <span className="font-bold">💶 TVA :</span> 20 % (FR)
                </div>
                <div>
                  <span className="font-bold">💱 Devise :</span> EUR
                </div>
              </CardContent>
            </Card>
            {/* Livraison / Tarifs */}
            <Card>
              <CardHeader>
                <CardTitle>Livraison & Tarifs</CardTitle>
                <CardDescription>Définis tes zones et tarifs de livraison.</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Type</th>
                      <th>Tarif</th>
                      <th>Active</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>France métropolitaine</td>
                      <td>Standard</td>
                      <td>5 €</td>
                      <td>✅</td>
                      <td><Button size="sm" variant="outline">Éditer</Button></td>
                    </tr>
                    {/* Autres zones... */}
                  </tbody>
                </table>
                <Button className="mt-4">Ajouter une méthode de livraison</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </DashboardAuthWrapper>
  );
}
