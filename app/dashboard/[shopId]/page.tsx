import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from '@/components/dashboard/header';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { getShop, getAllShops } from '@/lib/firebase/shops';
import type { Shop } from '@/lib/firebase/shops/types';

export async function generateStaticParams() {
  console.log("Fetching all shops for static params...");
  const shops = await getAllShops();

  if (!shops || shops.length === 0) {
    console.error("No shops found or failed to fetch shops.");
    return [];
  }

  console.log("Shops fetched successfully:", shops);

  return shops.map((shop) => {
    if (!shop.id) {
      console.error("Shop is missing an ID:", shop);
      return null;
    }
    return { shopId: String(shop.id) };
  }).filter(Boolean); // Filter out any null values
}

export default async function ShopDashboard({ params }: { params: { shopId: string } }) {
  console.log('Fetching shop with ID:', params.shopId);
  const shop: Shop | null = await getShop(params.shopId);

  if (!shop) {
    console.error('Shop not found or access denied for ID:', params.shopId);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Shop not found or you do not have access.</p>
      </div>
    );
  }

  console.log('Shop data fetched successfully:', shop);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{shop.name} Dashboard</h1>
            <p className="text-muted-foreground">Manage your shop settings, products, and more.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Shop Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{shop.isActive ? 'Active' : 'Inactive'}</div>
                <p className="text-xs text-muted-foreground mt-1">Manage your shop visibility</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{shop.ownerId}</div>
                <p className="text-xs text-muted-foreground mt-1">Shop owner ID</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Created At</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{new Date(shop.createdAt).toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Date of creation</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Shop Details</CardTitle>
                      <CardDescription>View and manage your shop information</CardDescription>
                    </div>
                    <Button>Edit Shop</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Slug: {shop.slug}</p>
                  <p className="text-sm">Shop ID: {params.shopId}</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">No recent activity available.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}