import React from "react";

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