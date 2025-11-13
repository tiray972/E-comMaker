import React from "react";

export function StaticPage({ content }: { content: string }) {
  return (
    <section className="py-8">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}