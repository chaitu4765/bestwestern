import { useReducedMotion, motion } from 'framer-motion';
import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  Accessibility,
  Bath,
  BedDouble,
  BriefcaseBusiness,
  CarFront,
  Coffee,
  Dumbbell,
  Luggage,
  LockKeyhole,
  MapPinned,
  PhoneCall,
  Shirt,
  Stethoscope,
  Tv,
  Utensils,
  WashingMachine,
  Wifi,
  Wind,
  Sandwich,
  CupSoda,
  Wine,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const serviceIcons: LucideIcon[] = [
  Coffee, Dumbbell, CarFront, Sandwich, Utensils, Wifi, Coffee, CupSoda,
  Wine, Tv, BriefcaseBusiness, LockKeyhole, Wind, Bath, PhoneCall, Shirt,
  BedDouble, Stethoscope, MapPinned, Accessibility, Luggage, WashingMachine,
];

export function AmenitiesGrid({items}: {items: string[]}) {
  const reducedMotion = useReducedMotion();

  const trackPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--grid-rotate-x', `${(0.5 - y) * 7}deg`);
    event.currentTarget.style.setProperty('--grid-rotate-y', `${(x - 0.5) * 9}deg`);
  };

  const resetPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--grid-rotate-x', '0deg');
    event.currentTarget.style.setProperty('--grid-rotate-y', '0deg');
  };

  return <div className="tj-facilities-shell">
    <div className="tj-facilities-grid" onPointerMove={trackPointer} onPointerLeave={resetPointer} role="list" aria-label="Guest services and hotel facilities">
      {items.map((label, index) => {
        const Icon = serviceIcons[index % serviceIcons.length];
        return <motion.div
          className="tj-facility-tile"
          role="listitem"
          key={label}
          initial={reducedMotion ? false : {opacity: 0, y: 18, scale: 0.97}}
          whileInView={reducedMotion ? undefined : {opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, amount: 0.12}}
          transition={{duration: 0.48, delay: (index % 5) * 0.045, ease: [0.16, 1, 0.3, 1]}}
          whileHover={reducedMotion ? undefined : {y: -5, scale: 1.025}}
        >
          <span className="tj-facility-icon" aria-hidden="true"><Icon size={34} strokeWidth={1.65}/></span>
          <span className="tj-facility-label">{label}</span>
        </motion.div>;
      })}
    </div>
  </div>;
}
