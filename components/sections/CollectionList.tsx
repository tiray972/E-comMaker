import React from "react";

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