import React from "react";

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