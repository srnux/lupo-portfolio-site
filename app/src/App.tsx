import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { COPY, CONCEPTS, ILLUSTRATIONS, SITE, type Lang, type Work } from "./content";
import { DustCanvas } from "./components/DustCanvas";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Lightbox } from "./components/Lightbox";
import { useHideOnScroll } from "./hooks/useHideOnScroll";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [illuOpen, setIlluOpen] = useState(false);
  const [conceptOpen, setConceptOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [lightbox, setLightbox] = useState<{ works: Work[]; index: number } | null>(null);

  const scroller = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLElement>(null);
  const s2 = useRef<HTMLElement>(null);
  const s3 = useRef<HTMLElement>(null);
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
  const toggleGallery = (open: boolean, set: (v: boolean) => void, ref: RefObject<HTMLElement | null>) => {
    if (open) goTo(ref);
    set(!open);
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
        onIllu={() => goTo(s2)}
        onConcept={() => goTo(s3)}
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

        <section ref={s2} className="section gallery" aria-label={t.navIllu}>
          <Gallery
            works={ILLUSTRATIONS}
            previewCount={SITE.illustrationPreview}
            expanded={illuOpen}
            variant="illu"
            moreLabel={t.more}
            lessLabel={t.less}
            onToggle={() => toggleGallery(illuOpen, setIlluOpen, s2)}
            onOpen={(index) => setLightbox({ works: ILLUSTRATIONS, index })}
          />
        </section>

        <section ref={s3} className="section gallery" aria-label={t.navConcept}>
          <Gallery
            works={CONCEPTS}
            previewCount={SITE.conceptPreview}
            expanded={conceptOpen}
            variant="concept"
            moreLabel={t.more}
            lessLabel={t.less}
            onToggle={() => toggleGallery(conceptOpen, setConceptOpen, s3)}
            onOpen={(index) => setLightbox({ works: CONCEPTS, index })}
          />
        </section>

        <section ref={s4} className="section about" aria-labelledby="about-title">
          <div className="about__body">
            <h2 id="about-title">{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
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
          </footer>
        </section>
      </main>

      {lightbox && (
        <Lightbox
          works={lightbox.works}
          index={lightbox.index}
          closeLabel={t.close}
          onClose={closeLightbox}
          onIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}
