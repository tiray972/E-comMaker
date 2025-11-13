import React from "react";

export function ContactForm() {
  return (
    <section className="py-8 max-w-md mx-auto">
      <input type="text" placeholder="Nom" className="w-full border p-2 mb-2" />
      <input type="email" placeholder="Email" className="w-full border p-2 mb-2" />
      <textarea placeholder="Message" className="w-full border p-2 mb-2"></textarea>
      <button className="px-4 py-2 bg-green-600 text-white rounded">Envoyer</button>
    </section>
  );
}