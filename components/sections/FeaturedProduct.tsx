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