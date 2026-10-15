import { useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { ADDRESS, BOOKING_URL } from '@/tejvivaan/data';
import { BookLink, PageIntro } from '@/tejvivaan/components';
import { LocationMap } from '@/components/ui/location-map';

const exactAddress = 'Railway Station Road, opposite DRM Office, Mandavaripeta, Dondaparthy, Railway New Colony, Visakhapatnam, Andhra Pradesh 530016, India';
const mapSearch = encodeURIComponent(`Best Western Plus Hotel Tejvivaan, ${exactAddress}`);
const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapSearch}`;

export function Contact() {
  const [emailReady, setEmailReady] = useState(false);
  const interest = new URLSearchParams(useLocation().search).get('interest') || 'A stay at Tejvivaan';
  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = `${interest}: ${String(fields.get('name'))}`;
    const body = [
      `Name: ${fields.get('name')}`,
      `Email: ${fields.get('email')}`,
      `Phone: ${fields.get('phone') || 'Not provided'}`,
      `Interest: ${fields.get('interest')}`,
      '',
      String(fields.get('message')),
    ].join('\n');
    window.location.href = `mailto:reservations@bwtejvivaan.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailReady(true);
  };
  return <main><PageIntro title="Let’s make a plan." description="A room, a table, an occasion. The Tejvivaan team can help with the details." image="gallery/hotel-1.jpg" secondaryImage="about-img-2.jpg"/><section className="tj-section tj-contact"><div><h2>We’re here to help.</h2><address><MapPin size={20}/>{ADDRESS}</address><a href="tel:+919777999999"><Phone size={19}/>+91 97779 99999</a><a href="tel:+918916677880"><Phone size={19}/>0891 6677 880</a><a href="mailto:reservations@bwtejvivaan.in"><Mail size={19}/>reservations@bwtejvivaan.in</a><a href={mapLink} target="_blank" rel="noreferrer" className="tj-text-link">Get directions<ArrowUpRight size={17}/></a><BookLink/><div className="tj-map-location"><LocationMap/></div></div><form className="tj-glass tj-enquiry" onSubmit={prepareEmail}><h2>Contact the hotel.</h2><p>Complete the form to open a ready-to-send email to the reservations team.</p><label>Your name<input name="name" autoComplete="name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>Phone (optional)<input name="phone" type="tel" autoComplete="tel"/></label><label>I’m interested in<input name="interest" defaultValue={interest} required/></label><label>How can we help?<textarea name="message" rows={5} required/></label><button className="tj-button" type="submit">Prepare email<Mail size={17}/></button>{emailReady&&<p role="status">Your email app should open with the enquiry ready. Review it and send to contact the hotel.</p>}<p className="tj-location-note">Your details are placed in your email draft and are not stored on this site.</p><a className="tj-text-link" href={BOOKING_URL}>Book on Best Western<ArrowUpRight size={17}/></a></form></section></main>;
}
