import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { Provider, useStore } from './store';
import { pages } from './data';
import { BOOKING_URL, articles } from './tejvivaan/data';
import { Header, Footer } from './tejvivaan/Layout';
import { BookLink, NotFound } from './tejvivaan/components';
const Home = lazy(() => import('./tejvivaan/pages/Home').then(m=>({default:m.Home})));
const Rooms = lazy(() => import('./tejvivaan/pages/Stay').then(m=>({default:m.Rooms})));
const Dining = lazy(() => import('./tejvivaan/pages/Dining').then(m=>({default:m.Dining})));
const Events = lazy(() => import('./tejvivaan/pages/Events').then(m=>({default:m.Events})));
const About = lazy(() => import('./tejvivaan/pages/Explore').then(m=>({default:m.About})));
const Services = lazy(() => import('./tejvivaan/pages/Explore').then(m=>({default:m.Services})));
const Gallery = lazy(() => import('./tejvivaan/pages/Gallery').then(m=>({default:m.Gallery})));
const Contact = lazy(() => import('./tejvivaan/pages/Contact').then(m=>({default:m.Contact})));
const Blog = lazy(() => import('./tejvivaan/pages/Journal').then(m=>({default:m.Blog})));
const Article = lazy(() => import('./tejvivaan/pages/Journal').then(m=>({default:m.Article})));
const Offers = lazy(() => import('./tejvivaan/pages/Info').then(m=>({default:m.Offers})));
const Legal = lazy(() => import('./tejvivaan/pages/Info').then(m=>({default:m.Legal})));
const Content = lazy(() => import('./tejvivaan/DemoFeatures').then(m=>({default:m.Content})));

function BookingRedirect() {useEffect(()=>{window.location.replace(BOOKING_URL);},[]);return <main className="tj-section"><h1>Continue your stay with Best Western.</h1><BookLink>Continue to official booking</BookLink></main>;}
const aliases:Record<string,string>={'/index.php':'/','/about.php':'/about','/rooms.php':'/rooms','/restaurant.php':'/restaurant','/meetings-and-events.php':'/meetings-and-events','/services.php':'/services','/gallery.php':'/gallery','/offers.php':'/offers','/contact.php':'/contact','/blog.php':'/blog','/hotels':'/rooms','/destinations':'/about','/destinations/visakhapatnam':'/about'};
function Alias({to}: {to:string}) {const {hash,search}=useLocation();return <Navigate replace to={to+search+hash}/>;}
function Shell() {
  const loc=useLocation();const {toast,notify}=useStore();
  useEffect(()=>{document.title='Best Western Plus Tejvivaan · Visakhapatnam';const timer=setTimeout(()=>{if(loc.hash)document.getElementById(decodeURIComponent(loc.hash.slice(1)))?.scrollIntoView({behavior:'instant'});else window.scrollTo({top:0,behavior:'instant'});},50);return()=>clearTimeout(timer);},[loc.pathname,loc.hash]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>notify(''),6500);return()=>clearTimeout(timer);},[toast,notify]);
  return <div className="tejvivaan-site"><a className="tj-skip" href="#site-content">Skip to content</a><Header/><div id="site-content"><Suspense fallback={<main className="tj-section" role="status">Preparing your Tejvivaan experience…</main>}><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/rooms" element={<Rooms/>}/><Route path="/restaurant" element={<Dining/>}/><Route path="/meetings-and-events" element={<Events/>}/><Route path="/services" element={<Services/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/offers" element={<Offers/>}/><Route path="/contact" element={<Contact/>}/><Route path="/blog" element={<Blog/>}/><Route path="/blog/:slug" element={<Article/>}/><Route path="/privacy" element={<Legal privacy/>}/><Route path="/terms" element={<Legal/>}/>
    {Object.entries(aliases).map(([path,to])=><Route key={path} path={path} element={<Alias to={to}/>}/>)}{articles.map(a=><Route key={a.slug} path={'/'+a.slug+'.php'} element={<Navigate to={'/blog/'+a.slug} replace/>}/>)}
    <Route path="/hotels/:id" element={<Navigate to="/rooms" replace/>}/><Route path="/hotels/:id/rooms" element={<Navigate to="/rooms" replace/>}/><Route path="/checkout/:id" element={<BookingRedirect/>}/><Route path="/book" element={<BookingRedirect/>}/>{Object.entries(pages).filter(([path])=>path.startsWith('/rewards')||path.startsWith('/support')||path==='/gift-cards').map(([path,page])=><Route key={path} path={path} element={<Content page={page}/>}/>)}<Route path="*" element={<NotFound/>}/></Routes></Suspense></div><Footer/>{toast&&<div className="toast" role="status">{toast}<button onClick={()=>notify('')} aria-label="Dismiss notification"><X size={17}/></button></div>}</div>;
}
export default function TejvivaanApp(){return <Provider><Shell/></Provider>;}
