import React from "react";

export function RichText({ html }: { html: string }) {
  return (
    <section className="py-8">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}