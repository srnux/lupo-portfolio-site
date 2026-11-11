import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { COPY, SITE, WORKS, type Lang, type Work } from "./content";
import { DustCanvas } from "./components/DustCanvas";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Lightbox } from "./components/Lightbox";
import { useHideOnScroll } from "./hooks/useHideOnScroll";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [lightbox, setLightbox] = useState<{ works: Work[]; index: number } | null>(null);

  const scroller = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLElement>(null);
  const s2 = useRef<HTMLElement>(null);
  const s4 = useRef<HTMLElement>(null);

  const t = COPY[lang];
  const barHidden = useHideOnScroll(scroller, () => setMenuOpen(false));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const goTo = (ref: RefObject<HTMLElement | null>) => {
    const el = scroller.current;
    const target = ref.current;
    if (el && target) el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    setMenuOpen(false);
  };

  // Collapsing a long gallery would otherwise strand the reader far below it.
  const toggleGallery = () => {
    if (galleryOpen) goTo(s2);
    setGalleryOpen(!galleryOpen);
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const setLightboxIndex = useCallback(
    (index: number) => setLightbox((lb) => (lb ? { ...lb, index } : lb)),
    [],
  );

  return (
    <div ref={scroller} className="scroller">
      <div className="grain" aria-hidden="true" />

      <Header
        t={t}
        lang={lang}
        hidden={barHidden}
        menuOpen={menuOpen}
        onLang={setLang}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onHome={() => goTo(s1)}
        onGallery={() => goTo(s2)}
        onAbout={() => goTo(s4)}
      />

      <main>
        <section ref={s1} className="section hero" aria-label="Lupo">
          <DustCanvas className="hero__layer" />
          {!videoFailed && (
            <video
              className="hero__layer hero__video"
              src={SITE.heroVideo}
              poster={SITE.heroPoster}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              onError={() => setVideoFailed(true)}
            />
          )}
          <div className="hero__shade" />
          <h1 className="hero__title">
            Lupo´s
            <br />
            Illustration
            <br />
            &amp; Concept Art
          </h1>
        </section>

        <section ref={s2} className="section gallery" aria-label={t.navGallery}>
          <Gallery
            works={WORKS}
            expanded={galleryOpen}
            moreLabel={t.more}
            lessLabel={t.less}
            onToggle={toggleGallery}
            onOpen={(works, index) => setLightbox({ works, index })}
          />
        </section>

        <section ref={s4} className="section about" aria-labelledby="about-title">
          <div className="about__body">
            <h2 id="about-title">{t.aboutTitle}</h2>
            <div className="about__text">
              {t.aboutBody.split("\n\n").map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          <footer className="footer">
            <a className="footer__download" href={SITE.portfolioFile} download>
              {t.download}
            </a>
            <button type="button" className="logo" onClick={() => goTo(s1)} title={t.backToStart}>
              Lupo
            </button>
            <div className="footer__contact">
              {contactOpen && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
              <button type="button" onClick={() => setContactOpen((o) => !o)} aria-expanded={contactOpen}>
                {t.contact}
              </button>
            </div>
            <p className="footer__legal">
              © {new Date().getFullYear()} {SITE.author}. {t.rights} {t.legal}
            </p>
          </footer>
        </section>
      </main>

      {lightbox && (
        <Lightbox
          works={lightbox.works}
          index={lightbox.index}
          closeLabel={t.close}
          author={SITE.author}
          onClose={closeLightbox}
          onIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}
