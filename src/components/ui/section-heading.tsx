import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  action?: ReactNode;
  align?: "start" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  action,
  align = "start",
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading--${align}${inverse ? " section-heading--inverse" : ""}`}
    >
      <div className="section-heading__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {body ? <p className="section-heading__body">{body}</p> : null}
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </div>
  );
}
