// Exemple d’implémentation de composants de sections Shopify-like en React avec Tailwind
// Chaque section correspond à un composant isolé réutilisable

import React from "react";

export function FeaturedProduct({ product }: { product: any }) {
  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <img src={product.image} alt={product.name} className="my-4" />
      <p>{product.description}</p>
    </section>
  );
}

export function CollectionList({ collections }: { collections: any[] }) {
  return (
    <section className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {collections.map((col) => (
        <div key={col.id} className="border rounded p-4">
          <img src={col.image} alt={col.title} className="w-full" />
          <h3 className="mt-2 font-bold">{col.title}</h3>
        </div>
      ))}
    </section>
  );
}

export function RichText({ html }: { html: string }) {
  return (
    <section className="py-8">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

export function ImageWithText({ image, text, reversed = false }: { image: string; text: string; reversed?: boolean }) {
  return (
    <section className={`flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} py-8 items-center gap-6`}>
      <img src={image} className="w-full md:w-1/2" alt="Image" />
      <p className="md:w-1/2 text-lg">{text}</p>
    </section>
  );
}

export function ImageBanner({ image, overlayText }: { image: string; overlayText?: string }) {
  return (
    <section className="relative h-64 md:h-96 overflow-hidden">
      <img src={image} className="w-full h-full object-cover" alt="Banner" />
      {overlayText && <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center text-2xl font-bold">{overlayText}</div>}
    </section>
  );
}

export function Slideshow({ images }: { images: string[] }) {
  return (
    <section className="overflow-hidden py-4">
      {/* Simplified static slideshow */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((img, i) => (
          <img key={i} src={img} className="h-48 w-auto rounded" alt={`Slide ${i}`} />
        ))}
      </div>
    </section>
  );
}

export function Collage({ images }: { images: string[] }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 py-8">
      {images.map((img, i) => (
        <img key={i} src={img} alt={`Collage ${i}`} className="w-full h-auto rounded" />
      ))}
    </section>
  );
}

export function MultiColumn({ columns }: { columns: { title: string; content: string }[] }) {
  return (
    <section className="grid md:grid-cols-3 gap-4 py-8">
      {columns.map((col, i) => (
        <div key={i} className="p-4 border rounded">
          <h3 className="font-bold text-lg mb-2">{col.title}</h3>
          <p>{col.content}</p>
        </div>
      ))}
    </section>
  );
}

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <section className="py-8">
      {items.map((item, i) => (
        <details key={i} className="mb-4 border rounded p-4">
          <summary className="font-bold cursor-pointer">{item.question}</summary>
          <p className="mt-2">{item.answer}</p>
        </details>
      ))}
    </section>
  );
}

export function NewsletterSignup() {
  return (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Inscris-toi à notre newsletter</h2>
      <input type="email" placeholder="Votre email" className="border rounded px-4 py-2" />
      <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Envoyer</button>
    </section>
  );
}

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

export function Video({ src }: { src: string }) {
  return (
    <section className="py-8">
      <video controls className="w-full">
        <source src={src} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
    </section>
  );
}

export function BlogArticles({ articles }: { articles: { title: string; excerpt: string; image: string }[] }) {
  return (
    <section className="py-8 grid md:grid-cols-3 gap-4">
      {articles.map((a, i) => (
        <div key={i} className="border rounded p-4">
          <img src={a.image} className="w-full h-40 object-cover" alt={a.title} />
          <h3 className="text-lg font-bold mt-2">{a.title}</h3>
          <p>{a.excerpt}</p>
        </div>
      ))}
    </section>
  );
}

export function CustomLiquid({ code }: { code: string }) {
  return (
    <section className="py-8">
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{code}</pre>
    </section>
  );
}

export function StaticPage({ content }: { content: string }) {
  return (
    <section className="py-8">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
