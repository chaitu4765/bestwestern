import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Modal } from "./ui";
export const roomPhotos: Record<string, { src: string; alt: string }[]> = {
  tejvivaan: [
    {
      src: "https://www.bestwesternplustejvivaan.com/images/banner/banner-img-main2-mobi.jpg",
      alt: "Tejvivaan guest bedroom with king bed and seating area",
    },
    {
      src: "https://www.bestwestern.no/images/158204d8-9b5b-4345-aea9-3de4470273c3__bwimages__large__21521881.webp",
      alt: "Tejvivaan twin-bed guest room",
    },
    {
      src: "https://www.bestwesternplustejvivaan.com/images/blog/top-hotel-in-visakhapatnam.jpg",
      alt: "Tejvivaan guest room with work desk and television",
    },
  ],
  ramachandra: [
    {
      src: "https://images.bestwestern.com/bwi/brochures/76564/photos/1024/21838364.jpg",
      alt: "Ramachandra guest bedroom with king bed and seating area",
    },
    {
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/b4/f7/42/best-western-ramachandra.jpg?h=-1&s=1&w=700",
      alt: "Ramachandra guest room with a table and chairs",
    },
    {
      src: "https://images.trvl-media.com/hotels/5000000/4870000/4869600/4869519/6cd1b2f9_z.jpg",
      alt: "Ramachandra suite with a king bed and sitting area",
    },
  ],
};
export function RoomGallery({
  hotel,
  initial = 0,
  onClose,
}: {
  hotel: string;
  initial?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initial);
  const photos = roomPhotos[hotel];
  return (
    <Modal title="A closer look at your stay" onClose={onClose}>
      <div className="room-gallery">
        <img src={photos[index].src} alt={photos[index].alt} />
        <div className="gallery-controls">
          <button
            className="icon-button"
            aria-label="Previous room photo"
            onClick={() =>
              setIndex((index + photos.length - 1) % photos.length)
            }
          >
            <ArrowLeft />
          </button>
          <span>
            {index + 1} / {photos.length}
          </span>
          <button
            className="icon-button"
            aria-label="Next room photo"
            onClick={() => setIndex((index + 1) % photos.length)}
          >
            <ArrowRight />
          </button>
        </div>
        <p>{photos[index].alt}</p>
        <div className="gallery-thumbs">
          {photos.map((p, i) => (
            <button
              key={p.src}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
              aria-label={"Show room photo " + (i + 1)}
              aria-pressed={i === index}
            >
              <img src={p.src} alt="" />
            </button>
          ))}
        </div>
        <small>
          Reference photos of this property. Your assigned room and furnishings
          may vary; demo room categories are illustrative.
        </small>
      </div>
    </Modal>
  );
}
export function RoomPhoto({
  hotel,
  index = 0,
}: {
  hotel: string;
  index?: number;
}) {
  const [open, setOpen] = useState(false);
  const photo = roomPhotos[hotel][index];
  return (
    <>
      <button
        className="room-photo-button"
        onClick={() => setOpen(true)}
        aria-label={"View " + photo.alt}
      >
        <img src={photo.src} alt={photo.alt} loading="lazy" />
        <span>
          <Expand size={15} />
          View room photos
        </span>
      </button>
      {open && (
        <RoomGallery
          hotel={hotel}
          initial={index}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
