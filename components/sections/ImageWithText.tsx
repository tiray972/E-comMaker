import React from "react";

export function ImageWithText({ image, text, reversed = false }: { image: string; text: string; reversed?: boolean }) {
  return (
    <section className={`flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} py-8 items-center gap-6`}>
      <img src={image} className="w-full md:w-1/2" alt="Image" />
      <p className="md:w-1/2 text-lg">{text}</p>
    </section>
  );
}