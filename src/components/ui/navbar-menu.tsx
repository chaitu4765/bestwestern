import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { hotels, slug } from "../../data";
import "./navbar-menu.css";

type NavigationLink = { label: string; detail: string; href: string; image?: string };
type NavigationGroup = { id: string; label: string; title: string; description: string; href: string; action: string; links: NavigationLink[] };

/** The supplied hover menu, adapted to React Router and the site's square blue surfaces. */
export default function NavbarMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocus = useRef(false);
  const reduced = useReducedMotion();
  const location = useLocation();
  const groups: NavigationGroup[] = [
    {
      id: "hotels", label: "Find a hotel", title: "Your next stay in Vizag.",
      description: "Two welcoming hotels. One city by the sea. Find your base for a little exploring.",
      href: "/hotels", action: "Explore all stays",
      links: [
        ...hotels.map(h => ({ label: h.name.replace("Best Western Plus ", ""), detail: `${h.area} · Visakhapatnam`, href: `/hotels/${h.id}`, image: h.image })),
        { label: "Discover Visakhapatnam", detail: "Beaches, hilltop views and city escapes", href: "/destinations/visakhapatnam" },
        { label: "Best Western Ashoka", detail: "Further afield · Hyderabad", href: "/further-afield/ashoka" },
        { label: "Best Western Tirupati", detail: "Further afield · Tirupati", href: "/further-afield/tirupati" },
      ],
    },
    {
      id: "rewards", label: "Rewards", title: "Make room for more.",
      description: "Get to know your membership, explore rewards and keep your travel plans together.",
      href: "/rewards", action: "Discover Rewards",
      links: [
        { label: "Member benefits", detail: "Explore the membership tiers", href: "/rewards/tiers" },
        { label: "Earn points", detail: "Discover ways to earn", href: "/rewards/earn" },
        { label: "Redeem points", detail: "Find your next reward", href: "/rewards/redeem" },
        { label: "Rewards catalog", detail: "Browse the demo collection", href: "/rewards/catalog" },
        { label: "Join Rewards", detail: "Start your local demo membership", href: "/join" },
        { label: "My account", detail: "Your profile, stays and points", href: "/account" },
      ],
    },
    {
      id: "offers", label: "Offers", title: "A little more for your stay.",
      description: "Explore rate options for your plans. Eligibility and live offers are confirmed by the hotel.",
      href: "/offers", action: "View all offers",
      links: [
        { label: "Book early", detail: "Plan ahead for your next trip", href: "/offers/early" },
        { label: "Last-minute stays", detail: "For a change of scenery", href: "/offers/last-minute" },
        { label: "AAA / CAA", detail: "Eligible member rate information", href: "/offers/aaa-caa" },
        { label: "Senior rates", detail: "Explore eligible rate options", href: "/offers/senior" },
        { label: "Government & military", detail: "Rate and eligibility information", href: "/offers/government" },
        { label: "Group stays", detail: "Bring your people together", href: "/groups" },
      ],
    },
    {
      id: "brands", label: "Our brands", title: "A stay for every story.",
      description: "Meet the Best Western family, from familiar favorites to distinctive places to stay.",
      href: "/brands", action: "Explore all 18 brands",
      links: ["Best Western", "Best Western Plus", "Best Western Premier", "Aiden", "SureStay", "WorldHotels Luxury"].map(label => ({ label, detail: "Explore the brand", href: `/brands/${slug(label)}` })),
    },
    {
      id: "support", label: "Support", title: "Here for your next step.",
      description: "Find answers, manage a reservation or get in touch with the right team.",
      href: "/support", action: "Visit the help center",
      links: [
        { label: "Frequently asked questions", detail: "A good place to start", href: "/support/faq" },
        { label: "Contact us", detail: "Find contact details and support", href: "/support/contacts" },
        { label: "Check reservations", detail: "Look up a demo booking", href: "/reservations" },
        { label: "Missing points", detail: "Submit a local demo enquiry", href: "/support/missing-points" },
        { label: "Low Rate Guarantee", detail: "Learn about the guarantee", href: "/low-rate-guarantee" },
        { label: "Accessibility", detail: "Plan a more comfortable stay", href: "/accessibility" },
      ],
    },
  ];

  const clearClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const show = (id: string) => { clearClose(); setActive(id); };
  const dismiss = () => { clearClose(); setActive(null); };
  useEffect(() => { setActive(null); }, [location.pathname, location.search, open]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setActive(null); };
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("pointerdown", outside); if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);

  return <nav ref={root} id="main-navigation" aria-label="Main navigation" className={`main-navigation ${open ? "open" : ""}`}
    onPointerEnter={clearClose}
    onPointerLeave={event => {
      if (event.pointerType === "mouse" && !root.current?.contains(document.activeElement)) {
        clearClose(); closeTimer.current = setTimeout(() => setActive(null), 160);
      }
    }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) dismiss(); }}
    onKeyDown={event => {
      if (event.key === "Escape" && active) {
        event.preventDefault(); event.stopPropagation();
        suppressFocus.current = true;
        root.current?.querySelector<HTMLButtonElement>(`#nav-trigger-${active}`)?.focus();
        suppressFocus.current = false;
        dismiss();
      }
    }}>
    {groups.map(group => <div className="nav-menu-item" key={group.id}
      onPointerEnter={event => { if (event.pointerType === "mouse" && window.matchMedia("(min-width: 781px)").matches) show(group.id); }}>
      <button id={`nav-trigger-${group.id}`} type="button" className="nav-menu-trigger"
        aria-expanded={active === group.id} aria-controls={`nav-panel-${group.id}`}
        onFocus={event => { if (!suppressFocus.current && event.currentTarget.matches(":focus-visible")) show(group.id); }}
        onClick={() => active === group.id ? dismiss() : show(group.id)}
        onKeyDown={event => {
          if (event.key === "ArrowDown") {
            event.preventDefault(); show(group.id);
            requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(`#nav-panel-${group.id} a`)?.focus());
          }
        }}>
        {group.label}<ChevronDown size={14} aria-hidden="true" />
      </button>
      {active === group.id && <motion.div id={`nav-panel-${group.id}`} className="nav-menu-panel" role="region" aria-labelledby={`nav-trigger-${group.id}`}
        initial={reduced ? false : { opacity: 0, y: 10, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={event => { if ((event.target as Element).closest("a[href]")) { dismiss(); onNavigate(); } }}>
        <div className="nav-menu-intro">
          <span>{group.label}</span><h2>{group.title}</h2><p>{group.description}</p>
          <Link to={group.href}>{group.action}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className={`nav-menu-links ${group.id === "hotels" ? "nav-hotel-links" : ""}`}>
          {group.links.map(link => <Link key={link.href} to={link.href} className={`nav-content-link ${link.image ? "nav-property-link" : ""}`}>
            {link.image && <img src={link.image} alt="" loading="lazy" />}
            <div><strong>{link.label}</strong><span>{link.detail}</span></div><ArrowUpRight size={17} aria-hidden="true" />
          </Link>)}
        </div>
      </motion.div>}
    </div>)}
  </nav>;
}
