import { useEffect, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Mail, MapPin, Heart, Check, Maximize2 } from 'lucide-react';
import { ADDRESS, BOOKING_URL, SOURCE, articles, dining, facilities, gallery, nearby, offers, photo, rooms, venues } from '@/tejvivaan/data';
import { motion, useReducedMotion } from 'framer-motion';
import { useStore } from '@/store';

export function BookLink({children = 'Book my stay', className = ''}: {children?: ReactNode; className?: string}) {
  return <a href={BOOKING_URL} className={`tj-button ${className}`}>{children}<ArrowUpRight size={17}/></a>;
}

export function Reveal({children, className = '', glare = false}: {children: ReactNode; className?: string; glare?: boolean}) {
  const reduced = useReducedMotion();
  const updateGlare = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!glare || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glare-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty('--glare-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };
  const resetGlare = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!glare) return;
    event.currentTarget.style.setProperty('--glare-x', '50%');
    event.currentTarget.style.setProperty('--glare-y', '50%');
  };
  return <motion.div className={`${className}${glare ? ' tj-cursor-glare' : ''}`} onPointerMove={glare ? updateGlare : undefined} onPointerLeave={glare ? resetGlare : undefined} initial={false} whileInView={reduced ? undefined : {y:[18,0],opacity:[.8,1]}} viewport={{once:true,amount:.12}} transition={{duration:.65,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}

export function updateFloatingCard(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch') return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;
  card.style.setProperty('--tilt-x', `${((50 - y) / 50) * 4}deg`);
  card.style.setProperty('--tilt-y', `${((x - 50) / 50) * 5}deg`);
  card.style.setProperty('--glare-x', `${x}%`);
  card.style.setProperty('--glare-y', `${y}%`);
  card.dataset.tiltActive = 'true';
}

export function resetFloatingCard(event: ReactPointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
  card.dataset.tiltActive = 'false';
}

export function PageIntro({title,description,image,secondaryImage,byline}: {title:string;description:string;image?:string;secondaryImage?:string;byline?:string}) {
  const reduced = useReducedMotion();
  const primary = image ?? 'gallery/hotel-1.jpg';
  const secondary = secondaryImage ?? 'gallery/hotel-2.jpg';
  const enter = reduced ? {} : {initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.72,ease:[.22,1,.36,1] as const}};
  const scrollToContent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.closest('.tj-page-intro')?.nextElementSibling?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
  };
  return <section className="tj-page-intro" aria-label={title}>
    <div className="tj-intro-shell">
      <motion.div className="tj-intro-content" {...enter}>
        <h1>{title}</h1>
        <p>{description}</p>
        {byline&&<p className="tj-intro-byline">{byline}</p>}
        <div className="tj-intro-actions"><BookLink className="tj-intro-book">Book your stay</BookLink><button className="tj-intro-explore" type="button" onClick={scrollToContent}>Explore this page<ArrowRight size={17}/></button></div>
        <div className="tj-intro-location"><MapPin size={16}/><span>Best Western Plus · Visakhapatnam, India</span></div>
      </motion.div>
      <motion.div className="tj-intro-visual" {...(reduced?{}:{initial:{opacity:0,scale:.97},animate:{opacity:1,scale:1},transition:{duration:.9,ease:[.22,1,.36,1] as const,delay:.12}})}>
        <figure className="tj-intro-main-photo"><img src={photo(primary)} alt="" fetchPriority="high"/><figcaption><span>Best Western Plus</span><strong>Tejvivaan · Visakhapatnam</strong></figcaption></figure>
        <figure className="tj-intro-secondary-photo"><img src={photo(secondary)} alt="" loading="lazy"/><figcaption>Explore the hotel</figcaption></figure>
        <div className="tj-intro-photo-mark" aria-hidden="true"><span>BW</span><small>PLUS</small></div>
      </motion.div>
    </div>
  </section>;
}

export function SaveHotel() {
  const {state,setState,notify}=useStore(); const saved=state.favorites.includes('tejvivaan');
  return <button className="tj-text-button" aria-pressed={saved} onClick={()=>{setState(s=>({...s,favorites:saved?s.favorites.filter(id=>id!=='tejvivaan'):[...s.favorites,'tejvivaan']}));notify(saved?'Removed from saved hotels.':'Tejvivaan saved on this device.');}}><Heart size={17} fill={saved?'currentColor':'none'}/>{saved?'Hotel saved on this device':'Save this hotel'}</button>;
}

export function NotFound(){return <main><PageIntro title="A different direction?" description="The page you were looking for is not here. Find your way back to Tejvivaan." image="gallery/hotel-1.jpg" secondaryImage="about-img-1.jpg"/><section className="tj-section tj-not-found"><Link to="/" className="tj-button">Back to our hotel<ArrowRight size={17}/></Link></section></main>;}
