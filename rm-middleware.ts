// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// //import { getIdToken } from "firebase-admin/auth"; // côté serveur
// //import { initializeApp as initializeAdminApp, cert, getApps as getAdminApps } from "firebase-admin/app";

// // Initialiser Firebase côté client (obligatoire ici pour Firestore)
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   // ... autres config si nécessaire
// };

// if (!getApps().length) initializeApp(firebaseConfig);

// const db = getFirestore();

// // Initialiser Firebase Admin
// if (!getAdminApps().length) {
//   initializeAdminApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("__session")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   try {
//     const decodedToken = await getIdToken(token);
//     const uid = decodedToken.uid;

//     // Récupère l'utilisateur dans Firestore
//     const userRef = doc(db, "users", uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }

//     const userData = userSnap.data();
//     const shopIds = userData?.shopIds;

//     if (!shopIds || shopIds.length === 0) {
//       return NextResponse.redirect(new URL("/create-shop", req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/products/:path*", "/orders/:path*"],
// };
