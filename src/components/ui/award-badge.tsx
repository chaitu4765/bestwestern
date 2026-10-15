import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import LinearCard from "./linear-card";
import "./award-badge.css";

/** The supplied badge's layered light/tilt treatment, adapted to member identity. */
export function GlowingProfileCard({ first, last }: { first: string; last: string }) {
  const name = [first, last].filter(Boolean).join(" ") || "Welcome, traveler";
  const initials = [first, last].filter(Boolean).map(part => Array.from(part.trim())[0]).join("").toUpperCase() || "BW";
  const maskId = `profile-glow-${useId().replaceAll(":", "")}`;
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const stopped = paused || hidden || !visible || !!reduced;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    if (surface.current) observer.observe(surface.current);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); cancelAnimationFrame(frame.current); };
  }, []);

  const reset = () => {
    cancelAnimationFrame(frame.current);
    surface.current?.style.setProperty("--profile-rx", "0deg");
    surface.current?.style.setProperty("--profile-ry", "0deg");
    surface.current?.style.setProperty("--profile-light-x", "50%");
    surface.current?.style.setProperty("--profile-light-y", "40%");
  };
  useEffect(() => { if (stopped) reset(); }, [stopped]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (stopped || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      surface.current?.style.setProperty("--profile-rx", `${(y - .5) * -8}deg`);
      surface.current?.style.setProperty("--profile-ry", `${(x - .5) * 8}deg`);
      surface.current?.style.setProperty("--profile-light-x", `${x * 100}%`);
      surface.current?.style.setProperty("--profile-light-y", `${y * 100}%`);
    });
  };

  return <LinearCard as="article" className="profile-member-card" title={name}>
    <div ref={surface} className={`profile-badge ${stopped ? "profile-glow-paused" : ""}`} onPointerMove={move} onPointerLeave={reset}>
      <div className="profile-light" aria-hidden="true" />
      <svg className="profile-hologram" viewBox="0 0 260 320" preserveAspectRatio="none" aria-hidden="true">
        <defs><clipPath id={maskId}><rect width="260" height="320" /></clipPath></defs>
        <g clipPath={`url(#${maskId})`}>
          {Array.from({ length: 10 }, (_, index) => <g key={index} className="profile-glow-ray" style={{ "--ray-angle": `${index * 18}deg`, animationDelay: `${index * -.6}s` } as CSSProperties}>
            <polygon points="-70,0 330,320 330,0 -70,320" fill={index % 3 === 0 ? "#ffffff" : index % 3 === 1 ? "#8acbff" : "#1f78ce"} opacity={index % 3 === 0 ? .08 : .12} />
          </g>)}
        </g>
      </svg>
      <div className="profile-badge-content">
        <div className="profile-badge-top"><span>BW REWARDS</span>
          <button type="button" className="profile-glow-control" onClick={() => setPaused(value => !value)} disabled={!!reduced}
            aria-label={reduced ? "Profile glow paused for reduced motion" : paused ? "Play profile glow" : "Pause profile glow"}>
            {paused || reduced ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
        <div className="profile-badge-identity">
          <div className="member-avatar" role="img" aria-label={`${name} initials avatar`}><span aria-hidden="true">{initials}</span></div>
          <div className="profile-badge-details">
            <h2>{name}</h2>
            <p className="profile-membership"><span aria-hidden="true" />Blue member · Demo</p>
            <Link className="profile-manage" to="/account/profile">Manage profile <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </div>
    </div>
  </LinearCard>;
}
