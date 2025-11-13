import React from "react";

export function ImageBanner({ image, overlayText }: { image: string; overlayText?: string }) {
  return (
    <section className="relative h-64 md:h-96 overflow-hidden">
      <img src={image} className="w-full h-full object-cover" alt="Banner" />
      {overlayText && <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center text-2xl font-bold">{overlayText}</div>}
    </section>
  );
}