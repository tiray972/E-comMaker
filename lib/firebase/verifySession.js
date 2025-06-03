import { admin } from './admin';

/**
 * Vérifie le cookie de session et retourne les informations de l'utilisateur.
 * @param {string} sessionCookie - Le cookie de session Firebase.
 * @returns {Promise<Object|null>} - Les informations de l'utilisateur ou null si invalide.
 */
export async function verifySessionCookie(sessionCookie) {
  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    // Validation supplémentaire pour le projet Firebase
    const expectedIssuer = `https://session.firebase.google.com/${process.env.FIREBASE_PROJECT_ID}`;
    console.log('Decoded Claims Issuer:', decodedClaims.iss);
    console.log('Expected Issuer:', expectedIssuer);

    if (decodedClaims.iss !== expectedIssuer) {
      throw new Error(
        `Firebase session cookie has incorrect "iss" (issuer) claim. Expected "${expectedIssuer}" but got "${decodedClaims.iss}".`
      );
    }

    return decodedClaims;
  } catch (error) {
    console.error('Erreur lors de la vérification du cookie de session :', error);
    return null;
  }
}