import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const carouselRef = useRef<HTMLDivElement>(null);
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

  const scrollCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (carousel) carousel.scrollBy({ left: direction * carousel.clientWidth * 0.82, behavior: 'smooth' });
  };

  return <main>
    <PageIntro title="A closer look." description="Spaces to settle into, tables to gather around, and moments waiting to happen." image="gallery/hotel-1.jpg" secondaryImage="gallery/dining-3.jpg"/>
    <section className="tj-section tj-gallery-section">
      <div className="tj-filters" aria-label="Filter gallery">
        {['All', ...categories].map(category => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setSelected(null); }}>{category}</button>)}
      </div>
      <p className="tj-gallery-count" aria-live="polite">{items.length} photographs</p>
      <p className="tj-gallery-hint">Open a folder, then choose a photograph.</p>
      <section className="tj-gallery-carousel" aria-labelledby="tj-gallery-carousel-title">
        <div className="tj-gallery-carousel-head">
          <div>
            <p className="tj-gallery-carousel-kicker">A closer look</p>
            <h2 id="tj-gallery-carousel-title">Moments around Tejvivaan</h2>
          </div>
          <div className="tj-gallery-carousel-controls" aria-label="Carousel controls">
            <button type="button" aria-label="Previous photographs" onClick={() => scrollCarousel(-1)}><ArrowLeft/></button>
            <button type="button" aria-label="Next photographs" onClick={() => scrollCarousel(1)}><ArrowRight/></button>
          </div>
        </div>
        <div className="tj-gallery-carousel-track" ref={carouselRef}>
          {items.map((item, index) => <motion.button
            key={item.file}
            type="button"
            className="tj-gallery-carousel-card"
            aria-label={`View ${item.category.toLowerCase()} photograph ${index + 1}`}
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
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
