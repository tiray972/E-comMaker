"use client";

import React, { useState, useRef, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db, app } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Pencil, Settings, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function ProfilePage() {
  const [user, setUser] = useState<import("firebase/auth").User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [pendingUsername, setPendingUsername] = useState<string>("");
  const [sites, setSites] = useState<any[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setBannerUrl(data.bannerUrl || "");
          setPhotoUrl(data.photoUrl || firebaseUser.photoURL || "");
          setUsername(data.username || firebaseUser.displayName || "");
        } else {
          setPhotoUrl(firebaseUser.photoURL || "");
          setUsername(firebaseUser.displayName || "");
        }
        const sitesSnap = await getDocs(collection(db, "sites"));
        const userSites = sitesSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(site => site.ownerId === firebaseUser.uid);
        setSites(userSites);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showSettings) setPendingUsername(username);
  }, [showSettings, username]);

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBannerUrl(url);
    await updateDoc(doc(db, "users", user.uid), { bannerUrl: url });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    await updateProfile(user, { photoURL: url }); // Auth profile
    await updateDoc(doc(db, "users", user.uid), { photoUrl: url }); // Firestore
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    if (pendingUsername !== username) {
      await updateProfile(user, { displayName: pendingUsername });
      await updateDoc(doc(db, "users", user.uid), { username: pendingUsername });
      setUsername(pendingUsername);
    }
    setShowSettings(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 rounded-xl border bg-background shadow relative">
      {/* Flèche retour dashboard en haut à gauche */}
      <Link href="/dashboard">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0 m-4"
          aria-label="Retour au dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      {/* Banner */}
      <div className="relative h-48 bg-muted rounded-t-xl overflow-hidden">
        {bannerUrl ? (
          <Image src={bannerUrl} alt="Bannière" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground" />
        )}
        {user && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 top-4 ${theme === "dark" ? "bg-black text-white hover:bg-black/80" : "bg-white text-black hover:bg-gray-200"}`}
            onClick={() => setShowSettings(true)}
            type="button"
          >
            <Settings className="h-5 w-5" />
          </Button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={bannerInputRef}
          className="hidden"
          onChange={handleBannerChange}
          tabIndex={-1}
        />
      </div>

      {/* Avatar & Username */}
      <div className="relative flex flex-col items-center -mt-16 pb-6 border-b">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={photoUrl || undefined} alt={username || "Avatar"} />
            <AvatarFallback>{username ? username[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            ref={photoInputRef}
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xl font-bold">{username || "Utilisateur"}</span>
        </div>
        <span className="text-muted-foreground text-sm mt-1">{user?.email}</span>
      </div>

      {/* Sites */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Mes sites créés</h2>
        {sites.length === 0 ? (
          <div className="text-muted-foreground">Aucun site créé pour l’instant.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sites.map(site => (
              <div key={site.id} className="border rounded-lg p-4 bg-muted/50 hover:bg-muted transition">
                <div className="font-bold text-lg truncate">{site.name || "Sans nom"}</div>
                <div className="text-xs text-muted-foreground break-all">{site.url || ""}</div>
                <div className="mt-2">
                  <Button asChild size="sm" variant="outline">
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      Voir le site
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setShowSettings(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" /> Modifier mon profil
            </h2>
            {/* Bannière */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Bannière</label>
              <div className="relative h-24 w-full rounded-lg overflow-hidden bg-muted mb-2">
                {bannerUrl && (
                  <Image src={bannerUrl} alt="Bannière" fill className="object-cover" />
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 bottom-2"
                  onClick={() => bannerInputRef.current?.click()}
                  type="button"
                >
                  Modifier
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={bannerInputRef}
                  className="hidden"
                  onChange={handleBannerChange}
                  tabIndex={-1}
                />
              </div>
            </div>
            {/* Photo de profil */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Photo de profil</label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={photoUrl || undefined} alt={pendingUsername || "Avatar"} />
                  <AvatarFallback>
                    {pendingUsername ? pendingUsername[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => photoInputRef.current?.click()}
                  type="button"
                >
                  Modifier
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={photoInputRef}
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            {/* Nom d'utilisateur */}
            <div className="mb-6">
              <label className="block text-sm mb-1">Nom d'utilisateur</label>
              <Input
                value={pendingUsername}
                onChange={e => setPendingUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
              />
            </div>
            <Button className="w-full" onClick={handleSaveProfile}>
              Valider
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
