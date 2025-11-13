import React from "react";

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