"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home,
  Layout, 
  ShoppingCart, 
  FileText, 
  Settings, 
  HelpCircle,
  BarChart3,
  Image, 
  Users,
  PanelLeft, 
  Plus 
} from 'lucide-react';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: 'Sites',
    href: '/dashboard/sites',
    icon: <Layout className="h-5 w-5" />,
  },
  {
    title: 'Templates',
    href: '/dashboard/templates',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Media',
    href: '/dashboard/media',
    icon: <Image className="h-5 w-5" />,
  },
  {
    title: 'E-commerce',
    href: '/dashboard/ecommerce',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: 'Help & Support',
    href: '/dashboard/support',
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export default function DashboardSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-1 font-semibold">
            <span className="text-xl font-bold text-primary">Buildr</span>
            <span className="text-xl text-muted-foreground">CMS</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 pb-4">
          <div className="px-3 py-4">
            <div className="mb-8">
              <Button className="w-full justify-start gap-2" size="sm">
                <Plus className="h-4 w-4" />
                Create New Site
              </Button>
            </div>
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-xs font-medium text-primary mb-1">Pro Plan Active</p>
            <p className="text-xs text-muted-foreground mb-3">
              Your plan renews on November 12, 2025
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs">
              Manage Subscription
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}