"use client";

import { useEffect } from "react";

type JsonLdProps = {
  id: string;
  value: string;
};

export function JsonLd({ id, value }: JsonLdProps) {
  useEffect(() => {
    const matches = Array.from(document.querySelectorAll("script")).filter(
      (candidate) => candidate.id === id,
    );
    let script = matches.shift() ?? null;

    matches.forEach((duplicate) => duplicate.remove());

    if (!(script instanceof HTMLScriptElement)) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = value;

    return () => script.remove();
  }, [id, value]);

  return null;
}
