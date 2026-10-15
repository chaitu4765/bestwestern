import { useCallback, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { animate, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import "./linear-card.css";

type CardTag = "article" | "aside" | "section" | "div";
type LinearCardProps = {
  as?: CardTag;
  className?: string;
  id?: string;
  title?: string;
  children: ReactNode;
};

/** Adapted from the supplied Linear card-to-dialog component.
 * A stable portal host keeps the same live card mounted during the transition,
 * including uncontrolled inputs, selection, nested dialogs and React handlers.
 */
export default function LinearCard({ as = "div", className = "", id, title, children }: LinearCardProps) {
  const uid = useId();
  const reduced = useReducedMotion();
  const [host] = useState(() => document.createElement(as));
  const [label, setLabel] = useState(title || "Card details");
  const [open, setOpen] = useState(false);
  const slot = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const running = useRef<ReturnType<typeof animate> | null>(null);
  const isOpen = useRef(false);
  const isClosing = useRef(false);
  const oldOverflow = useRef("");
  const associationCleanup = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    host.className = `${className} linear-card`;
    if (id) host.id = id;
    else host.removeAttribute("id");
  }, [host, className, id]);

  const restore = useCallback((focus = true) => {
    running.current?.stop();
    if (!isOpen.current) return;
    isOpen.current = false;
    isClosing.current = false;
    slot.current?.append(host);
    slot.current?.removeAttribute("style");
    host.removeAttribute("data-expanded");
    associationCleanup.current?.();
    associationCleanup.current = null;
    dialog.current?.close();
    dialog.current?.removeAttribute("style");
    document.body.style.overflow = oldOverflow.current;
    setOpen(false);
    if (focus) trigger.current?.focus({ preventScroll: true });
  }, [host]);

  useLayoutEffect(() => {
    slot.current?.append(host);
    return () => {
      running.current?.stop();
      if (isOpen.current) {
        associationCleanup.current?.();
        document.body.style.overflow = oldOverflow.current;
        dialog.current?.close();
      }
      host.remove();
    };
  }, [host]);

  useLayoutEffect(() => {
    const modal = dialog.current;
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !modal?.open || (event.target as Element).closest("dialog") !== modal) return;
      const items = Array.from(modal.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')).filter(el => el.getClientRects().length > 0);
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first && last) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last && first) { event.preventDefault(); first.focus(); }
    };
    modal?.addEventListener("keydown", trap);
    return () => modal?.removeEventListener("keydown", trap);
  }, []);

  useLayoutEffect(() => {
    setLabel(title || (host.querySelector("h1,h2,h3,strong") as HTMLElement)?.innerText?.replace(/\s+/g, " ").trim() || "Card details");
  }, [host, title, children]);

  // Navigation should never leave a modal/scroll lock behind. Do not intercept
  // ordinary controls, so favorites, basket updates and forms continue to work.
  useLayoutEffect(() => {
    const navigate = (event: Event) => {
      const link = (event.target as Element).closest("a[href]");
      if (isOpen.current && link && !link.getAttribute("href")?.startsWith("#")) restore(false);
    };
    host.addEventListener("click", navigate, true);
    return () => host.removeEventListener("click", navigate, true);
  }, [host, restore]);

  const expand = () => {
    if (isOpen.current || !slot.current || !dialog.current || !dock.current) return;
    const source = host.getBoundingClientRect();
    const computed = getComputedStyle(host);
    // Hold the original grid/list position while the live card is in the top layer.
    Object.assign(slot.current.style, {
      display: "block", width: `${source.width}px`, height: `${source.height}px`,
      maxWidth: "100%", margin: computed.margin, gridColumn: computed.gridColumn,
    });
    // Reparenting a form section must preserve its original form ownership.
    const controls = Array.from(host.querySelectorAll<HTMLInputElement | HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement>("input,button,select,textarea"));
    const associations = controls.filter(el => el.form && !host.contains(el.form)).map(el => {
      const form = el.form!;
      const previous = el.getAttribute("form");
      if (!form.id) form.id = `linear-form-${uid.replaceAll(":", "")}`;
      el.setAttribute("form", form.id);
      return () => previous === null ? el.removeAttribute("form") : el.setAttribute("form", previous);
    });
    associationCleanup.current = () => associations.forEach(fn => fn());
    oldOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    isOpen.current = true;
    setOpen(true);
    host.dataset.expanded = "true";
    dock.current.append(host);
    dialog.current.showModal();
    dialog.current.scrollTop = 0;
    closeButton.current?.focus({ preventScroll: true });
    const destination = dialog.current.getBoundingClientRect();
    if (!reduced) {
      running.current = animate(dialog.current, {
        x: [source.left - destination.left, 0], y: [source.top - destination.top, 0],
        scaleX: [source.width / destination.width, 1], scaleY: [source.height / destination.height, 1], opacity: [.75, 1],
      }, { type: "spring", bounce: .05, duration: .5 });
    }
  };

  const collapse = () => {
    if (!isOpen.current || isClosing.current) return;
    if (reduced || !slot.current || !dialog.current) { restore(); return; }
    isClosing.current = true;
    running.current?.stop();
    const destination = slot.current.getBoundingClientRect();
    const source = dialog.current.getBoundingClientRect();
    running.current = animate(dialog.current, {
      x: destination.left - source.left, y: destination.top - source.top,
      scaleX: destination.width / source.width, scaleY: destination.height / source.height, opacity: .5,
    }, { duration: .25, ease: [.22, 1, .36, 1], onComplete: () => restore() });
  };

  return <>
    <div ref={slot} className="linear-card-slot" />
    {createPortal(<>{children}<div className="linear-card-action">
      <button ref={trigger} type="button" className="linear-view-button" aria-label={`Quick view: ${label}`}
        aria-haspopup="dialog" aria-expanded={open} aria-controls={`linear-dialog-${uid}`} onClick={expand}>
        Quick view <Plus size={17} aria-hidden="true" />
      </button>
    </div></>, host)}
    {createPortal(<dialog ref={dialog} id={`linear-dialog-${uid}`} className="linear-card-dialog"
      aria-labelledby={`linear-title-${uid}`} onCancel={e => { e.preventDefault(); collapse(); }}
      onClick={e => { if (e.target === e.currentTarget) { const r=e.currentTarget.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) collapse(); } }}>
      <div className="linear-dialog-header">
        <h2 id={`linear-title-${uid}`}>{label}</h2>
        <button ref={closeButton} type="button" className="linear-close-button" onClick={collapse} aria-label="Close quick view"><X size={22}/></button>
      </div>
      <div ref={dock} className="linear-dialog-body" />
      <div className="linear-dialog-footer"><button type="button" className="button outline" onClick={collapse}>Back to page</button></div>
    </dialog>, document.body)}
  </>;
}
