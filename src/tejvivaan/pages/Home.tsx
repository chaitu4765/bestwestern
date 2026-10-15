import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { photo } from '@/tejvivaan/data';
import { Reveal, SaveHotel, updateFloatingCard, resetFloatingCard } from '@/tejvivaan/components';
import { RoomCards } from './Stay';
import LycorisSpecimen from '@/components/ui/lycoris-specimen';

export function Home() {
  return <main><LycorisSpecimen
    className="tj-flower"
    height="calc(100svh - 88px)"
    name="Tejvivaan"
    studio="Best Western Plus"
    description="A warm welcome to Visakhapatnam. Thoughtful rooms, memorable meals and space for every occasion, in the heart of the city."
    specs={['73 rooms & suites', 'Superior · Deluxe · Executive', 'Café Plus & Skyeline', 'Four meeting & event spaces']}
    tagline={[{text:'Make'},{text:'it an',small:true},{text:'occasion'},{text:'to remember',small:true}]}
    multilingual="Stay·Dine·Gather"
    ligatureWord="Welcome"
    links={[{label:'EXPLORE OUR ROOMS',href:'/rooms'},{label:'PLAN YOUR VISIT',href:'/contact'}]}
  />
    <section className="tj-section tj-welcome" id="hotel-welcome"><Reveal><h2>At the heart of Vizag.<br/><em>At your own pace.</em></h2><p>Welcome to Best Western Plus Hotel Tejvivaan. A city stay with space to breathe, from your first morning coffee to the last conversation of the evening.</p><p>Discover 73 rooms and suites, all-day dining and places to bring people together, moments from Visakhapatnam railway station.</p><div className="tj-inline"><Link className="tj-text-link" to="/about">Get to know us<ArrowRight size={18}/></Link><SaveHotel/></div></Reveal><div className="tj-welcome-image"><img src={photo('about-img-1.jpg')} alt="Inside Best Western Plus Hotel Tejvivaan" loading="lazy"/><div className="tj-glass tj-image-note"><MapPin size={18}/><span>Visakhapatnam, India<br/><small>Railway Station Road</small></span></div></div></section>
    <section className="tj-section"><div className="tj-section-head"><h2>A room for your kind of stay.</h2><Link to="/rooms" className="tj-text-link">Explore rooms<ArrowUpRight size={18}/></Link></div><RoomCards/></section>
    <section className="tj-dining-feature"><img src={photo('restaurant/CafePlus.jpg')} alt="Café Plus restaurant" loading="lazy"/><Reveal className="tj-glass tj-feature-copy" glare><h2>Come hungry.<br/>Stay a little longer.</h2><p>From an unhurried breakfast at Café Plus to an evening at Skyeline, find a seat for every mood.</p><Link className="tj-button" to="/restaurant">Discover dining<ArrowUpRight size={17}/></Link></Reveal></section>
    <section className="tj-section tj-event-feature"><Reveal><h2>Your people.<br/>Your occasion.</h2><p>Small conversations. Big celebrations. Four versatile spaces and a team ready to help you bring your plans together.</p><Link className="tj-button" to="/meetings-and-events">Find your space<ArrowUpRight size={17}/></Link></Reveal><img src={photo('banquets/viya.jpg')} alt="Viya banquet venue" loading="lazy"/></section>
    <section className="tj-section tj-home-end"><h2>See what awaits.</h2><div className="tj-photo-strip">{['room-1.jpg','dining-1.jpg','hotel-2.jpg'].map((file,i)=><Link to="/gallery" key={file} className="tj-photo-tilt" onPointerMove={updateFloatingCard} onPointerLeave={resetFloatingCard}><img src={photo('gallery/'+file)} alt={['Rooms at Tejvivaan','Dining at Tejvivaan','Hotel interiors'][i]} loading="lazy"/></Link>)}</div><Link to="/gallery" className="tj-text-link">View the gallery<ArrowUpRight size={18}/></Link></section>
  </main>;
}
