import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Mail, MapPin, Heart, Check, Maximize2 } from 'lucide-react';
import { ADDRESS, BOOKING_URL, SOURCE, articles, dining, facilities, gallery, nearby, offers, photo, rooms, venues } from '@/tejvivaan/data';
import { BookLink, Reveal, PageIntro, SaveHotel, NotFound } from '@/tejvivaan/components';
import LinearCard from '@/components/ui/linear-card';
import { Modal } from '@/ui';

export function Dining() {
  const [menu,setMenu]=useState(false);const [menuPage,setMenuPage]=useState(0);
  const menuImages=['menu-front.jpg',...Array.from({length:15},(_,i)=>[`${i+1}-image.jpg`,`${i+1}-menu.jpg`]).flat(),'menu-back.jpg'];
  return <main><PageIntro title="Good taste. Great company." description="A leisurely meal, a late-night craving, a table worth gathering around. Discover dining at Tejvivaan." image="restaurant/CafePlus1.jpg" secondaryImage="restaurant/skyline-13.jpg"/><section className="tj-section"><div className="tj-dining-list">{dining.map(item=><Reveal key={item.name}><LinearCard className="tj-dining-card" title={item.name}><img src={photo(item.image)} alt={item.name+' at Tejvivaan'} loading="lazy"/><div><h2>{item.name}</h2><p>{item.description}</p><span>{item.detail}</span></div></LinearCard></Reveal>)}</div><div className="tj-menu-panel tj-glass" id="menu"><h2>A look at the menu.</h2><p>Browse the hotel’s published menu, then contact the team for today’s availability and prices.</p><div className="tj-inline"><button className="tj-button" onClick={()=>setMenu(true)}>Browse menu<ArrowRight size={17}/></button><a href={SOURCE+'/menu.pdf'} target="_blank" rel="noreferrer" className="tj-text-link">Open menu PDF<ArrowUpRight size={17}/></a><a href="tel:+919866820099" className="tj-text-link"><Phone size={17}/>+91 98668 20099</a><a href="tel:+918916677005" className="tj-text-link">0891 6677 005</a></div></div></section>{menu&&<Modal title="Tejvivaan menu" onClose={()=>setMenu(false)}><img className="tj-menu-image" src={photo('menu/'+menuImages[menuPage])} alt={`Hotel menu page ${menuPage+1}`}/><div className="tj-viewer-controls"><button disabled={menuPage===0} onClick={()=>setMenuPage(menuPage-1)} aria-label="Previous menu page"><ArrowLeft/></button><span>{menuPage+1} / {menuImages.length}</span><button disabled={menuPage===menuImages.length-1} onClick={()=>setMenuPage(menuPage+1)} aria-label="Next menu page"><ArrowRight/></button></div></Modal>}</main>;
}
