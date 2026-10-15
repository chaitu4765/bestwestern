import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { gallery, photo } from '@/tejvivaan/data';
import { PageIntro } from '@/tejvivaan/components';
import GlassFolder, { type ArtRecipe } from '@/components/ui/glass-folder-cards';
import { Modal } from '@/ui';

const roseGlass: ArtRecipe = {
  style: 'marble',
  colors: ['#fff5f7', '#e8c1cd', '#bc758b', '#7f2342', '#4d2033', '#efb9c7'],
  scale: 0.72,
  warp: 2.8,
  angle: 0.55,
  gloss: 0.36,
  veins: 0.24,
};

export function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const [autoPaused, setAutoPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const resumeAfter = useRef(0);
  const reducedMotion = useReducedMotion();
  const items = filter === 'All' ? gallery : gallery.filter(item => item.category === filter);
  const categories = [...new Set(gallery.map(item => item.category))];
  const folders = (filter === 'All' ? categories : [filter]).map(category => ({
    category,
    photos: gallery.filter(item => item.category === category),
  }));

  useEffect(() => {
    if (selected === null) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setSelected(value => ((value ?? 0) + 1) % items.length);
      if (event.key === 'ArrowLeft') setSelected(value => ((value ?? 0) + items.length - 1) % items.length);
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [selected, items.length]);

  const openPhoto = (file: string) => {
    const index = items.findIndex(item => item.file === file);
    if (index >= 0) setSelected(index);
  };

  const scrollCarousel = useCallback((direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = Array.from(carousel.children) as HTMLElement[];
    if (!cards.length) return;
    const max = carousel.scrollWidth - carousel.clientWidth;
    const current = carousel.scrollLeft;
    const positions = cards.map(card => Math.min(max, card.offsetLeft - cards[0].offsetLeft));
    const left = direction === 1
      ? current >= max - 2 ? 0 : positions.find(position => position > current + 2) ?? max
      : current <= 2 ? max : positions.reverse().find(position => position < current - 2) ?? 0;
    carousel.scrollTo({ left, behavior: reducedMotion ? 'instant' : 'smooth' });
  }, [reducedMotion]);

  const holdAutoScroll = () => { resumeAfter.current = Date.now() + 6000; };

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0, behavior: 'instant' });
    resumeAfter.current = 0;
  }, [filter]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || reducedMotion !== false || autoPaused || hovered || focused || dragging || selected !== null || items.length < 2) return;
    let visible = false;
    let timer: number | undefined;
    const sync = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (!visible || document.hidden) return;
      timer = window.setInterval(() => {
        if (Date.now() >= resumeAfter.current) scrollCarousel(1);
      }, 4000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
      sync();
    }, { threshold: [0, 0.4] });
    observer.observe(carousel);
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [filter, items.length, reducedMotion, autoPaused, hovered, focused, dragging, selected, scrollCarousel]);

  return <main>
    <PageIntro title="A closer look." description="Spaces to settle into, tables to gather around, and moments waiting to happen." image="gallery/hotel-1.jpg" secondaryImage="gallery/dining-3.jpg"/>
    <section className="tj-section tj-gallery-section">
      <div className="tj-filters" aria-label="Filter gallery">
        {['All', ...categories].map(category => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setSelected(null); }}>{category}</button>)}
      </div>
      <p className="tj-gallery-count" aria-live="polite">{items.length} photographs</p>
      <p className="tj-gallery-hint">Open a folder, then choose a photograph.</p>
      <section className="tj-gallery-carousel" aria-labelledby="tj-gallery-carousel-title" aria-roledescription="carousel"
        onPointerEnter={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="tj-gallery-carousel-head">
          <div>
            <p className="tj-gallery-carousel-kicker">A closer look</p>
            <h2 id="tj-gallery-carousel-title">Moments around Tejvivaan</h2>
          </div>
          <div className="tj-gallery-carousel-controls" aria-label="Carousel controls">
            {!reducedMotion && <button type="button" aria-label={autoPaused ? 'Resume automatic scrolling' : 'Pause automatic scrolling'} aria-pressed={autoPaused} aria-controls="tj-gallery-carousel-track" onClick={() => setAutoPaused(value => !value)}>{autoPaused ? <Play size={18}/> : <Pause size={18}/>}</button>}
            <button type="button" aria-label="Previous photographs" aria-controls="tj-gallery-carousel-track" onClick={() => { holdAutoScroll(); scrollCarousel(-1); }}><ArrowLeft/></button>
            <button type="button" aria-label="Next photographs" aria-controls="tj-gallery-carousel-track" onClick={() => { holdAutoScroll(); scrollCarousel(1); }}><ArrowRight/></button>
          </div>
        </div>
        <div className="tj-gallery-carousel-track" id="tj-gallery-carousel-track" ref={carouselRef}
          onPointerDown={() => { setDragging(true); holdAutoScroll(); }}
          onPointerUp={() => { setDragging(false); holdAutoScroll(); }}
          onPointerCancel={() => { setDragging(false); holdAutoScroll(); }}
          onPointerLeave={() => setDragging(false)}
          onWheel={holdAutoScroll}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        >
          {items.map((item, index) => <motion.button
            key={item.file}
            type="button"
            className="tj-gallery-carousel-card"
            aria-label={`View ${item.category.toLowerCase()} photograph ${index + 1}`}
            initial={reducedMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1], delay: reducedMotion ? 0 : (index % 4) * 0.06 }}
            onClick={() => openPhoto(item.file)}
          >
            <img src={photo(`gallery/${item.file}`)} alt={`${item.category} at Best Western Plus Tejvivaan`} loading="lazy"/>
            <span><small>{String(index + 1).padStart(2, '0')}</small>{item.category}</span>
          </motion.button>)}
        </div>
      </section>
      <div className="tj-gallery-folders">
        {folders.map(({ category, photos: folderPhotos }, index) => <GlassFolder
          key={category}
          label={category}
          meta={`${folderPhotos.length} ${folderPhotos.length === 1 ? 'photograph' : 'photographs'}`}
          tone="light"
          art={roseGlass}
          image={photo(`gallery/${folderPhotos[0].file}`)}
          files={folderPhotos.map((item, itemIndex) => ({
            name: `${category} ${String(itemIndex + 1).padStart(2, '0')}`,
            meta: 'Tejvivaan gallery photo',
            image: photo(`gallery/${item.file}`),
          }))}
          action="none"
          width={320}
          appearDelay={index * 90}
          onFileSelect={(_file, fileIndex) => openPhoto(folderPhotos[fileIndex].file)}
        />)}
      </div>
    </section>
    {selected !== null && <Modal title={`${items[selected].category} · Tejvivaan`} onClose={() => setSelected(null)}>
      <img className="tj-lightbox-photo" src={photo(`gallery/${items[selected].file}`)} alt={`${items[selected].category} at Tejvivaan`}/>
      <div className="tj-viewer-controls">
        <button aria-label="Previous photograph" onClick={() => setSelected((selected + items.length - 1) % items.length)}><ArrowLeft/></button>
        <span aria-live="polite">{selected + 1} / {items.length}</span>
        <button aria-label="Next photograph" onClick={() => setSelected((selected + 1) % items.length)}><ArrowRight/></button>
      </div>
    </Modal>}
  </main>;
}
