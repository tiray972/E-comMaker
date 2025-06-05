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
// import DashboardAuthWrapper from '../DashboardAuthWrapper';

export default function ShopDashboard() {
  const { shop } = useAuth();

  const createdAt = shop.createdAt
    ? new Date(shop.createdAt.seconds * 1000).toLocaleDateString()
    : 'Unknown';

  return (
    // <DashboardAuthWrapper shop={{ ...shop, createdAt }}>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{shop.name} Dashboard</h1>
              <p className="text-muted-foreground">Manage yoshop settings, products, and more.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Shop Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {shop.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage your shop visibility
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Owner ID</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold truncate">{shop.ownerId}</div>
                  <p className="text-xs text-muted-foreground mt-1">Shop owner identifier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Created At</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{createdAt}</div>
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
                    <p className="text-sm">Shop ID: {shop.id}</p>
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
    // </DashboardAuthWrapper>
  );
}
