import type { Work } from "../content";

type Props = {
  works: Work[];
  expanded: boolean;
  moreLabel: string;
  lessLabel: string;
  onToggle: () => void;
  /** Opens the lightbox on the works currently visible, at the clicked one. */
  onOpen: (works: Work[], index: number) => void;
};

/** Framed grid of works: featured ones first, the rest behind "more / less". */
export function Gallery(p: Props) {
  const featured = p.works.filter((w) => w.featured);
  // With nothing marked as featured, show everything rather than an empty grid.
  const preview = featured.length > 0 ? featured : p.works;
  const canExpand = p.works.length > preview.length;
  const shown = p.expanded ? p.works : preview;

  return (
    <>
      <div className="grid">
        {shown.map((w, i) => (
          <button
            key={w.src}
            type="button"
            className={w.wide ? "frame frame--wide" : "frame"}
            style={w.bg ? { background: w.bg } : undefined}
            onClick={() => p.onOpen(shown, i)}
            aria-label={w.title}
          >
            <img
              src={w.src}
              alt={w.title}
              loading={w.featured ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ objectFit: w.fit ?? "cover" }}
            />
            <span className="frame__title">{w.title}</span>
          </button>
        ))}
      </div>
      {canExpand && (
        <button type="button" className="more" onClick={p.onToggle} aria-expanded={p.expanded}>
          {p.expanded ? p.lessLabel : p.moreLabel}
        </button>
      )}
    </>
  );
}
