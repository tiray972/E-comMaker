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

export default function taxesPage() {
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
            {/* Taxes */}
            <Card>
              <CardHeader>
                <CardTitle>Taxes</CardTitle>
                <CardDescription>Configure la TVA et les règles fiscales.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="font-medium">Gestion automatique des taxes</label>
                    <input type="checkbox" className="ml-2" />
                  </div>
                  <div>
                    <label className="font-medium">Taux de TVA (FR)</label>
                    <input type="number" className="border rounded px-2 py-1 ml-2 w-24" defaultValue={20} /> %
                  </div>
                  <div>
                    <label className="font-medium">Numéro de TVA</label>
                    <input type="text" className="border rounded px-2 py-1 ml-2" placeholder="FR123456789" />
                  </div>
                  <div>
                    <label className="font-medium">Prix affichés</label>
                    <select className="border rounded px-2 py-1 ml-2">
                      <option value="TTC">TTC</option>
                      <option value="HT">HT</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium">Appliquer la TVA sur les frais de livraison</label>
                    <input type="checkbox" className="ml-2" />
                  </div>
                  <Button className="mt-4">Enregistrer</Button>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </DashboardAuthWrapper>
  );
}
