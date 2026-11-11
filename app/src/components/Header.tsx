import type { Copy, Lang } from "../content";

type Props = {
  t: Copy;
  lang: Lang;
  hidden: boolean;
  menuOpen: boolean;
  onLang: (lang: Lang) => void;
  onToggleMenu: () => void;
  onHome: () => void;
  onGallery: () => void;
  onAbout: () => void;
};

export function Header(p: Props) {
  return (
    <>
      <header className={`header${p.hidden ? " is-hidden" : ""}`}>
        <button type="button" className="logo" onClick={p.onHome} title={p.t.backToStart}>
          <span className="logo__dot" aria-hidden="true" />Lupo<span className="logo__dot" aria-hidden="true" />
        </button>

        <div className="header__right">
          <div className="lang" role="group" aria-label="Language">
            <button
              type="button"
              className={p.lang === "en" ? "is-active" : ""}
              aria-pressed={p.lang === "en"}
              onClick={() => p.onLang("en")}
            >
              ENG
            </button>
            <button
              type="button"
              className={p.lang === "de" ? "is-active" : ""}
              aria-pressed={p.lang === "de"}
              onClick={() => p.onLang("de")}
            >
              GER
            </button>
          </div>

          <button
            type="button"
            className={`burger${p.menuOpen ? " is-open" : ""}`}
            onClick={p.onToggleMenu}
            title={p.t.menu}
            aria-label={p.t.menu}
            aria-expanded={p.menuOpen}
            aria-controls="site-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {p.menuOpen && (
        <nav id="site-menu" className="menu">
          <button type="button" onClick={p.onGallery}>
            {p.t.navGallery}
          </button>
          <button type="button" onClick={p.onAbout}>
            {p.t.navAbout}
          </button>
        </nav>
      )}
    </>
  );
}
