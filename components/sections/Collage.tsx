import React from "react";

export function Collage({ images }: { images: string[] }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 py-8">
      {images.map((img, i) => (
        <img key={i} src={img} alt={`Collage ${i}`} className="w-full h-auto rounded" />
      ))}
    </section>
  );
}