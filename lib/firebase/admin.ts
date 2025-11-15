// lib/firebase/admin.ts
// Ensure firebase-admin is only used server-side
if (typeof window !== "undefined") {
  throw new Error("firebase-admin should not be used in client-side code");
}

import admin from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// Instances réelles utilisables
export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminFieldValue = FieldValue;
export { admin };