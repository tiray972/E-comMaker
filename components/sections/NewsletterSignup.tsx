import React from "react";

export function NewsletterSignup() {
  return (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Inscris-toi à notre newsletter</h2>
      <input type="email" placeholder="Votre email" className="border rounded px-4 py-2" />
      <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Envoyer</button>
    </section>
  );
}