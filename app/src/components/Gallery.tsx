import type { Work } from "../content";

type Props = {
  works: Work[];
  previewCount: number;
  expanded: boolean;
  variant: "illu" | "concept";
  moreLabel: string;
  lessLabel: string;
  onToggle: () => void;
  onOpen: (index: number) => void;
};

/** Framed grid of works with the "more / less" toggle from the design. */
export function Gallery(p: Props) {
  const canExpand = p.works.length > p.previewCount;
  const shown = p.expanded ? p.works : p.works.slice(0, p.previewCount);

  return (
    <>
      <div className={`grid grid--${p.variant}`}>
        {shown.map((w, i) => (
          <button
            key={w.src}
            type="button"
            className="frame"
            style={w.bg ? { background: w.bg } : undefined}
            onClick={() => p.onOpen(i)}
            aria-label={w.title}
          >
            <img
              src={w.src}
              alt={w.title}
              loading={i < p.previewCount ? "eager" : "lazy"}
              decoding="async"
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
