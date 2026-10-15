import { useEffect, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Mail, MapPin, Heart, Check, Maximize2, BedDouble, Utensils, CalendarDays, Compass, ChevronDown } from 'lucide-react';
import { ADDRESS, BOOKING_URL, SOURCE, articles, dining, facilities, gallery, nearby, offers, photo, rooms, venues } from '@/tejvivaan/data';
import { BookLink, Reveal, PageIntro, SaveHotel, NotFound } from '@/tejvivaan/components';

const nav = [
  {label:'Stay',to:'/rooms',items:[['All rooms','/rooms'],['Superior Room','/rooms#superiorroom'],['Deluxe Room','/rooms#deluxeroom'],['Executive Suite','/rooms#executivesuite']]},
  {label:'Dine',to:'/restaurant',items:[['Café Plus & Skyeline','/restaurant'],['Explore the menu','/restaurant#menu']]},
  {label:'Gather',to:'/meetings-and-events',items:[['Meetings & events','/meetings-and-events'],['Plan an occasion','/contact?interest=Events']]},
  {label:'Discover',to:'/about',items:[['Our hotel','/about'],['Services & amenities','/services'],['Gallery','/gallery'],['Offers','/offers'],['Hotel journal','/blog']]},
];

const navIcons = {Stay: BedDouble, Dine: Utensils, Gather: CalendarDays, Discover: Compass};

export function Header() {
  const [mobile,setMobile] = useState(false);
  const [open,setOpen] = useState<string|null>(null);
  const [hidden,setHidden] = useState(false);
  const {pathname} = useLocation();
  useEffect(()=>{setMobile(false);setOpen(null);},[pathname]);
  useEffect(()=>{
    let previousY = window.scrollY;
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(()=>{
        const currentY = window.scrollY;
        const delta = currentY - previousY;
        const intro = pathname === '/' ? document.querySelector('.tj-flower') : null;
        const inIntro = intro !== null && intro.getBoundingClientRect().bottom > 88;
        if (currentY < 80 || mobile || inIntro) setHidden(false);
        else if (Math.abs(delta) > 5) {
          const shouldHide = delta > 0;
          setHidden(shouldHide);
          if (shouldHide) setOpen(null);
        }
        previousY = currentY;
        frame = 0;
      });
    };
    window.addEventListener('scroll',handleScroll,{passive:true});
    return ()=>{window.removeEventListener('scroll',handleScroll);if(frame)window.cancelAnimationFrame(frame);};
  },[mobile,pathname]);
  const magnifyDock = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const items = event.currentTarget.querySelectorAll<HTMLElement>('[data-dock-item]');
    items.forEach(item=>{
      const bounds = item.getBoundingClientRect();
      const proximity = Math.max(0, 1 - Math.abs(event.clientX - (bounds.left + bounds.width / 2)) / 140);
      const strength = proximity * proximity;
      item.style.setProperty('--dock-scale', String(1 + strength * 0.28));
      item.style.setProperty('--dock-lift', `${strength * -5}px`);
    });
  };
  const resetDock = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.querySelectorAll<HTMLElement>('[data-dock-item]').forEach(item=>{
      item.style.setProperty('--dock-scale', '1');
      item.style.setProperty('--dock-lift', '0px');
    });
  };
  return <header className={`tj-header${pathname==='/'?' tj-header--intro':''}${hidden&&!mobile?' tj-header--hidden':''}`} onKeyDown={e=>{if(e.key==='Escape'){setOpen(null);setMobile(false);}}}>
    <Link to="/" className="tj-brand" aria-label="Best Western Plus Tejvivaan home"><span className="tj-monogram">BW<span>PLUS</span></span><span><small>BEST WESTERN PLUS</small><strong>Tejvivaan</strong></span></Link>
    <nav className={`tj-navigation ${mobile?'is-open':''}`} aria-label="Main navigation" id="hotel-navigation" onPointerMove={magnifyDock} onPointerLeave={resetDock}>
      {nav.map(group=>{const Icon=navIcons[group.label as keyof typeof navIcons];return <div className="tj-nav-group" key={group.label} onMouseEnter={()=>setOpen(group.label)} onMouseLeave={()=>setOpen(null)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(null);}}>
        <button className="tj-dock-item" data-dock-item aria-expanded={open===group.label} aria-controls={`menu-${group.label}`} onFocus={()=>setOpen(group.label)} onClick={()=>setOpen(open===group.label?null:group.label)}><span className="tj-dock-symbol" aria-hidden><Icon size={17}/></span><span>{group.label}</span><ChevronDown className="tj-dock-chevron" size={13} aria-hidden/></button>
        {open===group.label&&<div className="tj-dropdown" id={`menu-${group.label}`}><Link className="tj-dropdown-title" to={group.to}>{group.label} at Tejvivaan<ArrowUpRight size={18}/></Link>{group.items.map(([label,to])=><Link key={to} to={to} onClick={()=>{setOpen(null);setMobile(false);}}>{label}</Link>)}</div>}
      </div>;})}
      <NavLink className="tj-dock-item" data-dock-item to="/contact"><span className="tj-dock-symbol" aria-hidden><Phone size={16}/></span><span>Contact</span></NavLink>
    </nav>
    <BookLink/><button className="tj-menu-button" aria-label={mobile?'Close navigation':'Open navigation'} aria-expanded={mobile} aria-controls="hotel-navigation" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
  </header>;
}

export function Footer() {
  return <footer className="tj-footer"><div className="tj-footer-top"><div><h2>A little more<br/>to look forward to.</h2><BookLink/><p>Continue to Best Western for rates and availability.</p></div><div><h3>Visit Tejvivaan</h3><address>{ADDRESS}</address><a href="tel:+919777999999">+91 97779 99999</a><a href="tel:+918916677880">0891 6677 880</a><a href="mailto:reservations@bwtejvivaan.in">reservations@bwtejvivaan.in</a></div><div><h3>Explore</h3>{[['Our hotel','/about'],['Rooms & suites','/rooms'],['Dining','/restaurant'],['Meetings & events','/meetings-and-events'],['Services','/services'],['Gallery','/gallery'],['Offers','/offers'],['Journal','/blog']].map(([label,to])=><Link key={to} to={to}>{label}</Link>)}</div></div>
    <div className="tj-footer-links"><a href="https://www.facebook.com/BWPlusTejvivaan/" target="_blank" rel="noreferrer">Facebook<ArrowUpRight size={13}/></a><a href="https://www.instagram.com/bw_plus_tejvivaan/" target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={13}/></a><a href="https://www.youtube.com/watch?v=5UmKMGhMAdk" target="_blank" rel="noreferrer">Hotel film<ArrowUpRight size={13}/></a><a href="https://www.bestwestern.com/en_US/offers/hotel-discounts/special-offer/rewardsrush1.html">Best Western Rewards<ArrowUpRight size={13}/></a><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
    <div className="tj-footer-word" aria-hidden="true">Tejvivaan</div><div className="tj-footer-bottom"><span>Best Western Plus · Visakhapatnam</span><span>Independent design demo. Bookings take place on the official site.</span></div>
  </footer>;
}
