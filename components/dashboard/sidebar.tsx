"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home, ShoppingCart, FileText, Users, Layout, CreditCard,
  BarChart3, Settings, HelpCircle, Plus, ChevronDown, ChevronRight, Layers, List, Package, Import, ClipboardList, RefreshCw, UserPlus, Mail, Palette, File, Menu, Image, Globe, DollarSign, Truck, Languages, PieChart, Zap, UserCog, Key
} from 'lucide-react';

type SubItem = {
  title: string;
  href: (shopId: string) => string;
  icon?: React.ReactNode;
};

type SidebarItem = {
  title: string;
  href?: (shopId: string) => string;
  icon: React.ReactNode;
  subItems?: SubItem[];
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Accueil',
    href: (shopId) => `/dashboard/${shopId}`,
    icon: <Home className="h-5 w-5" />,
    subItems: [
      { title: "Tableau de bord", href: (shopId) => `/dashboard/${shopId}` },
      { title: "Dernières commandes", href: (shopId) => `/dashboard/${shopId}/orders` },
      { title: "Statistiques rapides", href: (shopId) => `/dashboard/${shopId}/stats` },
    ],
  },
  {
    title: 'Produits',
    icon: <ShoppingCart className="h-5 w-5" />,
    subItems: [
      { title: "Tous les produits", href: (shopId) => `/dashboard/${shopId}/products`, icon: <Package className="h-4 w-4" /> },
      { title: "Ajouter un produit", href: (shopId) => `/dashboard/${shopId}/products/new`, icon: <Plus className="h-4 w-4" /> },
      { title: "Collections / Catégories", href: (shopId) => `/dashboard/${shopId}/collections`, icon: <Layers className="h-4 w-4" /> },
      { title: "Inventaire / Variantes", href: (shopId) => `/dashboard/${shopId}/inventory`, icon: <List className="h-4 w-4" /> },
      { title: "Import / Export", href: (shopId) => `/dashboard/${shopId}/import-export`, icon: <Import className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Commandes',
    icon: <FileText className="h-5 w-5" />,
    subItems: [
      { title: "Commandes en cours", href: (shopId) => `/dashboard/${shopId}/orders?status=ongoing`, icon: <ClipboardList className="h-4 w-4" /> },
      { title: "Commandes terminées", href: (shopId) => `/dashboard/${shopId}/orders?status=done`, icon: <ClipboardList className="h-4 w-4" /> },
      { title: "Retours / Remboursements", href: (shopId) => `/dashboard/${shopId}/orders/returns`, icon: <RefreshCw className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Clients',
    icon: <Users className="h-5 w-5" />,
    subItems: [
      { title: "Liste clients", href: (shopId) => `/dashboard/${shopId}/customers`, icon: <Users className="h-4 w-4" /> },
      { title: "Segments / Groupes", href: (shopId) => `/dashboard/${shopId}/customers/groups`, icon: <UserPlus className="h-4 w-4" /> },
      { title: "Messages ou e-mails", href: (shopId) => `/dashboard/${shopId}/customers/messages`, icon: <Mail className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Boutique',
    icon: <Layout className="h-5 w-5" />,
    subItems: [
      { title: "Thèmes / Templates", href: (shopId) => `/dashboard/${shopId}/builder/themes`, icon: <Palette className="h-4 w-4" /> },
      { title: "Éditeur visuel", href: (shopId) => `/dashboard/${shopId}/builder/editor`, icon: <File className="h-4 w-4" /> },
      { title: "Pages", href: (shopId) => `/dashboard/${shopId}/builder/pages`, icon: <File className="h-4 w-4" /> },
      { title: "Menu & Navigation", href: (shopId) => `/dashboard/${shopId}/builder/menu`, icon: <Menu className="h-4 w-4" /> },
      { title: "Médias", href: (shopId) => `/dashboard/${shopId}/builder/media`, icon: <Image className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Paiements',
    icon: <CreditCard className="h-5 w-5" />,
    subItems: [
      { title: "Moyens de paiement", href: (shopId) => `/dashboard/${shopId}/payments`, icon: <CreditCard className="h-4 w-4" /> },
      { title: "Livraison / Tarifs", href: (shopId) => `/dashboard/${shopId}/shipping`, icon: <Truck className="h-4 w-4" /> },
      { title: "Taxes", href: (shopId) => `/dashboard/${shopId}/taxes`, icon: <DollarSign className="h-4 w-4" /> },
      { title: "Devise et langue", href: (shopId) => `/dashboard/${shopId}/settings/localization`, icon: <Languages className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Marketing',
    icon: <BarChart3 className="h-5 w-5" />,
    subItems: [
      { title: "Campagnes", href: (shopId) => `/dashboard/${shopId}/marketing/campaigns`, icon: <Zap className="h-4 w-4" /> },
      { title: "Statistiques de vente", href: (shopId) => `/dashboard/${shopId}/marketing/stats`, icon: <PieChart className="h-4 w-4" /> },
      { title: "Sources de trafic", href: (shopId) => `/dashboard/${shopId}/marketing/traffic`, icon: <Globe className="h-4 w-4" /> },
      { title: "Intégrations", href: (shopId) => `/dashboard/${shopId}/marketing/integrations`, icon: <Settings className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Paramètres',
    icon: <Settings className="h-5 w-5" />,
    subItems: [
      { title: "Informations du magasin", href: (shopId) => `/dashboard/${shopId}/settings/store`, icon: <Home className="h-4 w-4" /> },
      { title: "Utilisateurs & rôles", href: (shopId) => `/dashboard/${shopId}/settings/users`, icon: <UserCog className="h-4 w-4" /> },
      { title: "Abonnement / Plan", href: (shopId) => `/dashboard/${shopId}/settings/plan`, icon: <Key className="h-4 w-4" /> },
      { title: "Intégrations / API", href: (shopId) => `/dashboard/${shopId}/settings/api`, icon: <Settings className="h-4 w-4" /> },
    ],
  },
  
];

export default function DashboardSidebar() {
  const params = useParams();
  const shopId = typeof params?.shopId === 'string' ? params.shopId : '';
  const [open, setOpen] = useState<number | null>(null);

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
              {sidebarItems.map((item, idx) => (
                <div key={idx}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => setOpen(open === idx ? null : idx)}
                    aria-expanded={open === idx}
                  >
                    {item.icon}
                    {item.title}
                    {item.subItems && (
                      open === idx
                        ? <ChevronDown className="ml-auto h-4 w-4" />
                        : <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </Button>
                  {item.subItems && open === idx && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((sub, subIdx) => (
                        <Button
                          key={subIdx}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start gap-2 text-xs"
                          asChild
                        >
                          <Link href={sub.href(shopId)}>
                            {sub.icon}
                            {sub.title}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                  {!item.subItems && item.href && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                      asChild
                    >
                      <Link href={item.href(shopId)}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </Button>
                  )}
                </div>
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
          <Button variant="ghost" size="sm" className="w-full mt-2 justify-start gap-2" asChild>
            <Link href={sidebarItems[sidebarItems.length - 1].href?.(shopId) || '#'}>
              <HelpCircle className="h-5 w-5" />
              Aide & Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}