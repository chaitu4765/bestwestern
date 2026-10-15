import { useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Map, MapPin } from 'lucide-react';

const fullAddress = 'Railway Station Road, opposite DRM Office, Mandavaripeta, Dondaparthy, Railway New Colony, Visakhapatnam, Andhra Pradesh 530016, India';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Best Western Plus Hotel Tejvivaan, ${fullAddress}`)}`;

export function LocationMap() {
  const [expanded, setExpanded] = useState(false);
  const mapRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const tiltMap = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch' || !mapRef.current) return;
    const bounds = mapRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    mapRef.current.style.setProperty('--map-tilt-x', `${y * -5}deg`);
    mapRef.current.style.setProperty('--map-tilt-y', `${x * 7}deg`);
    mapRef.current.style.setProperty('--map-glow-x', `${(x + 0.5) * 100}%`);
    mapRef.current.style.setProperty('--map-glow-y', `${(y + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    mapRef.current?.style.setProperty('--map-tilt-x', '0deg');
    mapRef.current?.style.setProperty('--map-tilt-y', '0deg');
  };

  return <section className="tj-location-widget" aria-label="Hotel location">
    <p className="tj-location-widget-label">HOTEL LOCATION</p>
    <motion.button
      ref={mapRef}
      type="button"
      className={`tj-location-map-card${expanded ? ' is-expanded' : ''}`}
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Collapse' : 'Expand'} hotel location map`}
      onClick={() => setExpanded(value => !value)}
      onPointerMove={tiltMap}
      onPointerLeave={resetTilt}
      animate={{ height: expanded ? 340 : 172 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 30 }}
    >
      <span className="tj-location-map-art" aria-hidden="true">
        <span className="tj-location-road road-one"/><span className="tj-location-road road-two"/><span className="tj-location-road road-three"/>
        <span className="tj-location-building building-one"/><span className="tj-location-building building-two"/><span className="tj-location-building building-three"/><span className="tj-location-building building-four"/>
        <motion.span className="tj-location-pin" animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}><MapPin size={26} fill="currentColor"/></motion.span>
      </span>
      <span className="tj-location-map-glow" aria-hidden="true"/>
      <span className="tj-location-map-top"><Map size={19}/><span className="tj-location-status"><i/> HOTEL PIN</span></span>
      <span className="tj-location-map-copy">
        <strong>Best Western Plus Tejvivaan</strong>
        <AnimatePresence initial={false}>
          {expanded && <motion.span className="tj-location-expanded-copy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
            <span>{fullAddress}</span>
            <span className="tj-location-hint">Opposite DRM Office · Dondaparthy</span>
          </motion.span>}
        </AnimatePresence>
        {!expanded && <span className="tj-location-city">Visakhapatnam, Andhra Pradesh</span>}
      </span>
    </motion.button>
    <div className="tj-location-map-footer"><span>{expanded ? 'Hotel address shown' : 'Click to expand'}</span><a href={mapUrl} target="_blank" rel="noreferrer">Directions<ArrowUpRight size={14}/></a></div>
  </section>;
}
