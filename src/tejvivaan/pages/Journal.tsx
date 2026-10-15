import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Phone, Mail, MapPin, Heart, Check, Maximize2 } from 'lucide-react';
import { ADDRESS, BOOKING_URL, SOURCE, articles, dining, facilities, gallery, nearby, offers, photo, rooms, venues } from '@/tejvivaan/data';
import { BookLink, Reveal, PageIntro, SaveHotel, NotFound } from '@/tejvivaan/components';
import LinearCard from '@/components/ui/linear-card';

export function Blog() {
  return <main><PageIntro title="Notes from Tejvivaan." description="Dining inspiration, occasions to remember and ideas for your next visit." image="blog/best-family-restaurant-in-vizag.jpg" secondaryImage="blog/top-hotel-in-visakhapatnam.jpg"/><section className="tj-section tj-blog-grid">{articles.map(a=><LinearCard title={a.title} className="tj-blog-card" key={a.slug}><img src={photo('blog/'+a.image)} alt="" loading="lazy"/><div><time>{a.date}</time><h2><Link to={'/blog/'+a.slug}>{a.title}</Link></h2><Link to={'/blog/'+a.slug} className="tj-text-link">Read the story<ArrowRight size={17}/></Link></div></LinearCard>)}</section></main>;
}

export function Article() {
  const {slug}=useParams();const article=articles.find(a=>a.slug===slug);if(!article)return <NotFound/>;
  return <main><PageIntro title={article.title} description="Ideas and inspiration for your next Tejvivaan stay." image={'blog/'+article.image} secondaryImage="blog/top-hotel-in-visakhapatnam.jpg" byline={`${article.date} · Tejvivaan journal`}/><section className="tj-section tj-article tj-article-content"><Link to="/blog" className="tj-text-link"><ArrowLeft size={17}/>Hotel journal</Link>{article.paragraphs.map(p=><p key={p}>{p}</p>)}<p className="tj-muted">Adapted summary of the hotel’s published article.</p><a className="tj-text-link" href={SOURCE+'/'+article.slug+'.php'} target="_blank" rel="noreferrer">Read the original article<ArrowUpRight size={17}/></a><Link className="tj-button" to="/contact">Plan your visit<ArrowRight size={17}/></Link></section></main>;
}
