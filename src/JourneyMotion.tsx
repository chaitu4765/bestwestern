import {useEffect,useState} from 'react';
import {useLocation,Link} from 'react-router-dom';
import {motion,useReducedMotion,useScroll} from 'framer-motion';
import {Check,ArrowUp} from 'lucide-react';

export function JourneyMotion(){
 const {pathname}=useLocation();const reduced=useReducedMotion();const{scrollYProgress}=useScroll();const[back,setBack]=useState(false);
 const enabled=/^\/(hotels|checkout|confirmation|account)(\/|$)/.test(pathname);
 useEffect(()=>{
  if(!enabled)return;
  const animations:Animation[]=[];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced)animations.push(entry.target.animate([{opacity:.72,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.16,1,.3,1)'}));observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.detail-layout section,.room-row,.checkout-layout .form-section,.account-content .form-section,.rewards-summary,.reservation').forEach(el=>observer.observe(el));
  const scroll=()=>setBack(window.scrollY>650);scroll();window.addEventListener('scroll',scroll,{passive:true});
  return()=>{observer.disconnect();animations.forEach(a=>a.cancel());window.removeEventListener('scroll',scroll);};
 },[pathname,reduced,enabled]);
 if(!enabled)return null;
 return <><motion.div className="journey-progress" aria-hidden="true" style={{scaleX:scrollYProgress}}/>{back&&<button className="back-to-top" aria-label="Back to top" onClick={()=>{window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});document.getElementById('main-content')?.focus({preventScroll:true});}}><ArrowUp size={18}/></button>}</>;
}

export function SectionNav({items,label}:{items:{id:string;label:string}[];label:string}){
 const[active,setActive]=useState(items[0]?.id);const key=items.map(i=>i.id).join('|');
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible[0])setActive(visible[0].target.id);},{rootMargin:'-10% 0px -55% 0px',threshold:0});items.forEach(i=>{const el=document.getElementById(i.id);if(el)observer.observe(el);});return()=>observer.disconnect();},[key]);
 return <nav className="anchor-nav interactive-anchor-nav" aria-label={label}>{items.map(i=><a key={i.id} href={'#'+i.id} onClick={()=>setActive(i.id)} aria-current={active===i.id?'location':undefined}>{i.label}<span className="anchor-indicator"/></a>)}</nav>;
}

export function BookingSteps({hotel,step}:{hotel:string;step:1|2|3}){return <nav className="booking-steps" aria-label="Booking progress">{['Choose a room','Guest details','Confirmation'].map((label,i)=><div key={label} className={i+1===step?'current':i+1<step?'complete':''} aria-current={i+1===step?'step':undefined}><span>{i+1<step?<Check size={16}/>:i+1}</span>{i===0&&step>1?<Link to={'/hotels/'+hotel+'/rooms'}>{label}</Link>:<strong>{label}</strong>}</div>)}</nav>}
