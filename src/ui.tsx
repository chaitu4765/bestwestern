import LinearCard from "@/components/ui/linear-card";
import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { animate, useReducedMotion } from "framer-motion";
export function Go({
  to,
  children,
  className = "button",
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return to.startsWith("http") || to.startsWith("tel:") ? (
    <a
      className={className}
      href={to}
      target={to.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      {...props}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  ) : (
    <Link className={className} to={to} {...props}>
      {children}
    </Link>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const origin = useRef<DOMRect | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!origin.current && document.activeElement !== document.body) origin.current = document.activeElement?.getBoundingClientRect() || null;
    const source = origin.current;
    const modal = ref.current;
    modal?.showModal();
    const target = modal?.getBoundingClientRect();
    const animation = modal && target && source?.width && !reduced ? animate(modal, {
      x: [source.left-target.left, 0], y: [source.top-target.top, 0],
      scaleX: [source.width/target.width, 1], scaleY: [source.height/target.height, 1], opacity: [.6,1],
    }, {type:"spring",bounce:.05,duration:.5}) : null;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      animation?.stop();
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="linear-existing-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="modal-head">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title,
  text,
  action,
  to,
}: {
  title: string;
  text: string;
  action?: string;
  to?: string;
}) {
  return (
    <LinearCard as="div" className="empty">
      <h2>{title}</h2>
      <p>{text}</p>
      {to && (
        <Go to={to}>
          {action} <ArrowUpRight size={18} />
        </Go>
      )}
    </LinearCard>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
