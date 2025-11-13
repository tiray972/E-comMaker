import React from "react";

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