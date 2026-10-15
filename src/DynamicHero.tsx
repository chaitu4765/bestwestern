import {useEffect,useRef,useState} from 'react';
import {motion,AnimatePresence,useScroll,useTransform,useReducedMotion,useInView} from 'framer-motion';
import {MapPin,ArrowDown,ArrowUpRight,ArrowLeft,ArrowRight,Pause,Play} from 'lucide-react';
import {coast} from './data';
import {roomPhotos} from './RoomGallery';
import {WaveShader} from './WaveShader';

const scenes=[
 {image:coast,alt:'Rushikonda Beach coastline in Visakhapatnam',caption:'Rushikonda Beach',word:'coast.',stamp:'Switch off.',label:'The coast'},
 {image:roomPhotos.tejvivaan[0].src,alt:roomPhotos.tejvivaan[0].alt,caption:'Inside Tejvivaan',word:'comfort.',stamp:'Stay a while.',label:'Tejvivaan rooms'},
 {image:roomPhotos.ramachandra[0].src,alt:roomPhotos.ramachandra[0].alt,caption:'Inside Ramachandra',word:'calm.',stamp:'Settle in.',label:'Ramachandra rooms'}
];

// Adapted from ishamsu's 21st Smooth Scroll Hero (component 2061):
// useScroll/useTransform drive photo depth; bounded to the existing split hero.
export function DynamicHero(){
 const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();const inView=useInView(ref);const[paused,setPaused]=useState(false);const[index,setIndex]=useState(0);const[hidden,setHidden]=useState(document.hidden);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const photoY=useTransform(scrollYProgress,[0,1],['0%','12%']);const photoScale=useTransform(scrollYProgress,[0,1],[1.04,1.14]);const stampY=useTransform(scrollYProgress,[0,1],[0,-38]);
 const stop=paused||!!reduced;
 useEffect(()=>{const change=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
 useEffect(()=>{if(stop||!inView||hidden)return;const timer=setInterval(()=>setIndex(i=>(i+1)%scenes.length),6500);return()=>clearInterval(timer);},[stop,inView,hidden]);
 const scene=scenes[index];function select(i:number){setIndex((i+scenes.length)%scenes.length);setPaused(true);}
 return <section ref={ref} className="home-hero dynamic-hero" aria-label="Discover Visakhapatnam" aria-roledescription="carousel"><div className="hero-copy"><div className="hero-location"><MapPin size={16}/>VISAKHAPATNAM, INDIA<span>17.6868° N · 83.2185° E</span></div><motion.h1 initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65,ease:[.16,1,.3,1]}} aria-label="A little coast. A lot to come home to."><span aria-hidden="true">A little <span className="hero-changing-word"><AnimatePresence mode="wait"><motion.span key={scene.word} initial={reduced?false:{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={reduced?{}:{y:-20,opacity:0}} transition={{duration:.3}}>{scene.word}</motion.span></AnimatePresence></span><br/>A lot to<br/><span className="outline-text">come home to.</span></span></motion.h1><div className="hero-bottom"><p>Sea air. City energy. A warm welcome.<br/>Find your kind of stay in Vizag.</p><a className="circle-arrow" href="#find-stay" aria-label="Find your stay"><ArrowDown size={28}/></a></div></div><div className="hero-image"><motion.div className="hero-photo-stage" style={{y:stop?0:photoY,scale:stop?1.04:photoScale}}><AnimatePresence initial={false}><motion.img key={scene.image} src={scene.image} alt={scene.alt} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.7}} fetchPriority="high"/></AnimatePresence></motion.div><motion.div className="photo-stamp" style={{y:stop?0:stampY}}><span>CHECK IN.</span><strong>{scene.stamp}</strong><ArrowUpRight size={30}/></motion.div><div className="hero-scene-controls"><span className="scene-caption">{String(index+1).padStart(2,'0')} / {scene.caption}</span><div><button onClick={()=>select(index-1)} aria-label="Previous hero scene"><ArrowLeft size={17}/></button><button onClick={()=>setPaused(!paused)} aria-label={stop?'Play hero animation':'Pause hero animation'} disabled={!!reduced}>{stop?<Play size={15}/>:<Pause size={15}/>}</button><button onClick={()=>select(index+1)} aria-label="Next hero scene"><ArrowRight size={17}/></button></div></div></div><div className="hero-tide"><WaveShader paused={stop}/><div className="tide-copy"><span>FIND YOUR RHYTHM.</span><p>A new perspective is closer than you think.</p></div><div className="scene-tabs" role="group" aria-label="Choose hero scene">{scenes.map((s,i)=><button key={s.label} aria-pressed={index===i} onClick={()=>select(i)}><span>{String(i+1).padStart(2,'0')}</span>{s.label}<ArrowUpRight size={15}/></button>)}</div></div></section>;
}

export function ScrollMotion(){const{scrollYProgress}=useScroll();const reduced=useReducedMotion();useEffect(()=>{if(reduced)return;const sections=document.querySelectorAll('.home-hotels .hotel-grid,.rewards-feature');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{transform:'translateY(22px)',opacity:.65},{transform:'translateY(0)',opacity:1}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'});observer.unobserve(entry.target);}}),{threshold:.12});sections.forEach(s=>observer.observe(s));return()=>observer.disconnect();},[reduced]);return <motion.div className="scroll-progress" style={{scaleX:reduced?0:scrollYProgress}} aria-hidden="true"/>;}
