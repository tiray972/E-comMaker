import React from "react";

export function Slideshow({ images }: { images: string[] }) {
  return (
    <section className="overflow-hidden py-4">
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((img, i) => (
          <img key={i} src={img} className="h-48 w-auto rounded" alt={`Slide ${i}`} />
        ))}
      </div>
    </section>
  );
}