// app/api/session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/admin';

export async function POST(req: Request) {
  const { token } = await req.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 jours

  try {
    const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: expiresIn / 1000,
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error("Erreur lors de la création du cookie de session :", error);
    return NextResponse.json({ error: 'Invalid token ' }, { status: 401 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value || '';
    if (!sessionCookie) return NextResponse.json({ error: 'Session cookie manquant' }, { status: 401 });

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return NextResponse.json(decodedClaims);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur authentifié :", error);
    return NextResponse.json({ error: 'Session invalide ou expirée' }, { status: 401 });
  }
}

/**
 * Récupère l'utilisateur authentifié côté serveur.
 * @returns {Promise<Object|null>} - Les informations de l'utilisateur ou null si non authentifié.
 */
export async function getServerAuthUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value || '';
    if (!sessionCookie) return null;

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error('Erreur lors de la récupération de lutilisateur authentifié :', error);
    return null;
  }
}
