import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Mail, MapPin, Heart, Check, Maximize2 } from 'lucide-react';
import { ADDRESS, BOOKING_URL, SOURCE, articles, dining, facilities, gallery, nearby, offers, photo, rooms, venues } from '@/tejvivaan/data';
import { BookLink, PageIntro, SaveHotel, NotFound } from '@/tejvivaan/components';
import LinearCard from '@/components/ui/linear-card';

export function RoomCards({scaleMultiplier = 0.03}: {scaleMultiplier?: number}) {
  return <div className="tj-room-list tj-room-stack" aria-label="Room categories. Scroll to reveal each room.">{rooms.map((room,i)=>{
    const stackStyle = {
      '--stack-index': i,
      '--stack-offset': `${i * 14}px`,
      '--stack-z': 10 + i,
      '--stack-scale': 1 - (rooms.length - 1 - i) * scaleMultiplier,
    } as CSSProperties;
    return <div className="tj-room-stack-item" style={stackStyle} key={room.id}>
      <LinearCard className="tj-room-card" id={room.id} title={room.name}>
        <div className="tj-room-photo"><img src={photo(room.image)} alt={`${room.name} at Tejvivaan`} loading="lazy"/><span>{room.area} sq ft</span></div>
        <div className="tj-room-copy"><span className="tj-room-number" aria-hidden>0{i+1}</span><h2>{room.name}</h2><p>{room.description}</p><ul>{room.features.map(feature=><li key={feature}><Check size={15}/>{feature}</li>)}</ul><BookLink>Book {room.name}</BookLink><small>View current rates on Best Western.</small></div>
      </LinearCard>
    </div>;
  })}</div>;
}

export function Rooms() {
  return <main><PageIntro title="Settle into your own space." description="Three room categories. One thoughtful welcome. Find your place among 73 rooms and suites at Tejvivaan." image="banner/banner-img-main2.jpg" secondaryImage="gallery/room-2.jpg"/><section className="tj-section"><div className="tj-room-jump">{rooms.map(r=><a href={'#'+r.id} key={r.id}>{r.name}</a>)}</div><RoomCards/><div className="tj-glass tj-note"><h3>The little things, taken care of.</h3><p>Wi-Fi, packaged water, tea and coffee facilities, a safe and television. An iron and ironing board are available on request. Inclusions vary by room and rate; confirm details when booking.</p><p>Check-in from 2 pm · Check-out by 12 noon</p><Link to="/services" className="tj-text-link">All amenities<ArrowRight size={17}/></Link></div></section></main>;
}
