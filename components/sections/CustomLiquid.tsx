import React from "react";

export function CustomLiquid({ code }: { code: string }) {
  return (
    <section className="py-8">
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{code}</pre>
    </section>
  );
}