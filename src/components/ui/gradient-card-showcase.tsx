import { Children, type CSSProperties, type ReactNode } from "react";
import "./gradient-card-showcase.css";

type SkewCardsProps = {
  children: ReactNode;
  className?: string;
};

/** The supplied SkewCards effect, adapted to wrap real hotel cards. */
export default function SkewCards({ children, className = "" }: SkewCardsProps) {
  return (
    <div className={`hotel-grid gradient-card-showcase ${className}`}>
      {Children.map(children, (card, index) => (
        <div
          className="skew-card tw:relative tw:isolate tw:min-w-0"
          style={{ "--skew-direction": index % 2 ? -1 : 1 } as CSSProperties}
        >
          <span aria-hidden="true" className="skew-panel tw:pointer-events-none tw:absolute" />
          <span aria-hidden="true" className="skew-panel skew-panel-glow tw:pointer-events-none tw:absolute" />
          <span aria-hidden="true" className="skew-floats tw:pointer-events-none tw:absolute tw:inset-0">
            <span className="skew-float skew-float-top" />
            <span className="skew-float skew-float-bottom" />
          </span>
          <div className="skew-card-content tw:relative tw:h-full">{card}</div>
        </div>
      ))}
    </div>
  );
}
