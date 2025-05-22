"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  // Compte
  const [publicProfile, setPublicProfile] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showOnline, setShowOnline] = useState(true);

  // Sécurité
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [dataExport, setDataExport] = useState(false);

  // Paiement
  const [saveCard, setSaveCard] = useState(true);
  const [autoRenew, setAutoRenew] = useState(false);

  const handleSave = () => {
    alert("Paramètres sauvegardés !");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 relative">
      {/* Flèche retour dashboard en haut à gauche */}
      <Link href="/dashboard">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0"
          aria-label="Retour au dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Paramètres</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Gère tes préférences de notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span>Notifications par email</span>
            <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between">
            <span>Notifications push</span>
            <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
          </div>
          <div className="flex items-center justify-between">
            <span>Recevoir la newsletter</span>
            <Switch checked={newsletter} onCheckedChange={setNewsletter} />
          </div>
          <div className="flex items-center justify-between">
            <span>Alertes de connexion</span>
            <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compte</CardTitle>
          <CardDescription>Options liées à la confidentialité et au compte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span>Profil public</span>
            <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
          </div>
          <div className="flex items-center justify-between">
            <span>Afficher mon statut en ligne</span>
            <Switch checked={showOnline} onCheckedChange={setShowOnline} />
          </div>
          <div className="flex items-center justify-between">
            <span>Sauvegarde automatique</span>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          <div className="flex items-center justify-between">
            <span>Double authentification</span>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Paiement</CardTitle>
          <CardDescription>Préférences de facturation et d'abonnement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span>Enregistrer ma carte</span>
            <Switch checked={saveCard} onCheckedChange={setSaveCard} />
          </div>
          <div className="flex items-center justify-between">
            <span>Renouvellement automatique</span>
            <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Données & confidentialité</CardTitle>
          <CardDescription>Contrôle sur tes données personnelles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span>Exporter mes données</span>
            <Switch checked={dataExport} onCheckedChange={setDataExport} />
          </div>
        </CardContent>
      </Card>

      <Button className="mt-8 w-full" onClick={handleSave}>
        Sauvegarder
      </Button>
    </div>
  );
}