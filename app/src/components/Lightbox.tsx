import { useEffect } from "react";
import type { Work } from "../content";

type Props = {
  works: Work[];
  index: number;
  closeLabel: string;
  onClose: () => void;
  onIndex: (index: number) => void;
};

/** Full-screen viewer for a single work. Esc closes, arrow keys step through. */
export function Lightbox({ works, index, closeLabel, onClose, onIndex }: Props) {
  const work = works[index];
  const count = works.length;
  const prev = () => onIndex((index - 1 + count) % count);
  const next = () => onIndex((index + 1) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
      else if (e.key === "ArrowRight") onIndex((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onIndex]);

  if (!work) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={work.title} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={work.src} alt={work.title} />
        <figcaption>
          {work.title}
          <span className="lightbox__count">
            {index + 1} / {count}
          </span>
        </figcaption>
      </figure>
      {count > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </>
      )}
      <button type="button" className="lightbox__close" aria-label={closeLabel} autoFocus onClick={onClose}>
        ×
      </button>
    </div>
  );
}
