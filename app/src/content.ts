export type Lang = "en" | "de";

export const COPY = {
  en: {
    navIllu: "Illustration",
    navConcept: "Concept Art",
    navAbout: "About me",
    aboutTitle: "About me",
    download: "Portfolio",
    contact: "Contact",
    more: "more",
    less: "less",
    backToStart: "Back to start",
    menu: "Menu",
    close: "Close",
    aboutBody:
      "I'm Lupo, a design and illustration student working between hand-drawn character work and moody concept art for games and books. I draw in ink and paint digitally, and I like faces that look like they have been through something. Currently taking on commissions, collaborations and internships.",
  },
  de: {
    navIllu: "Illustration",
    navConcept: "Concept Art",
    navAbout: "Über mich",
    aboutTitle: "Über mich",
    download: "Portfolio",
    contact: "Kontakt",
    more: "mehr",
    less: "weniger",
    backToStart: "Zurück zum Anfang",
    menu: "Menü",
    close: "Schließen",
    aboutBody:
      "Ich bin Lupo, Student für Design und Illustration – zwischen handgezeichneter Charakterarbeit und stimmungsvollem Concept Art für Spiele und Bücher. Ich zeichne mit Tusche und male digital, und ich mag Gesichter, die etwas erlebt haben. Für Aufträge, Kollaborationen und Praktika bin ich offen.",
  },
} satisfies Record<Lang, Record<string, string>>;

export type Copy = (typeof COPY)[Lang];

/** Site settings (formerly the editable props of the .dc.html design). */
export const SITE = {
  email: "hello@lupo-art.com",
  /** Downloadable portfolio file, served from /public. */
  portfolioFile: `${import.meta.env.BASE_URL}lupo-portfolio.pdf`,
  heroVideo: `${import.meta.env.BASE_URL}images/timeline-1.mp4`,
  /** First frame of the hero video, shown while it loads. */
  heroPoster: `${import.meta.env.BASE_URL}images/timeline-1-poster.jpg`,
  /** How many works each gallery shows before "more" is clicked. */
  illustrationPreview: 3,
  conceptPreview: 2,
};

export type Work = {
  src: string;
  title: string;
  /** "contain" letterboxes the image inside its frame instead of cropping it. */
  fit?: "cover" | "contain";
  /** Frame background behind a letterboxed ("contain") image. */
  bg?: string;
};

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

/** Portrait A3 works – shown in the Illustration grid (1 : 1.414 frames). */
export const ILLUSTRATIONS: Work[] = [
  { src: img("david.jpg"), title: "David" },
  { src: img("death-claims-nike.jpg"), title: "Death claims Nike" },
  { src: img("hades.jpg"), title: "Hades" },
  { src: img("poseidons-storm.jpg"), title: "Poseidon's Storm" },
  { src: img("king-of-pisces.jpg"), title: "King of Pisces" },
  { src: img("princess-of-autumn.jpg"), title: "Princess of Autumn" },
  { src: img("crimson.jpg"), title: "Crimson" },
  { src: img("bound-by-flesh-26-re.jpg"), title: "Bound by Flesh" },
  { src: img("rider-of-the-night-re.jpg"), title: "Rider of the Night" },
  { src: img("first-trumpet-single-layer.jpg"), title: "The First Trumpet" },
  { src: img("dragonslayer.jpg"), title: "Dragonslayer" },
  { src: img("banished-illustration.jpg"), title: "Banished" },
  { src: img("banished-illustration-cover.jpg"), title: "Banished – Cover" },
];

/** Concept work – shown in the Concept Art grid (3 : 2 frames). */
export const CONCEPTS: Work[] = [
  { src: img("wanderer.jpg"), title: "Wanderer" },
  { src: img("soulstree-concept.jpg"), title: "Soulstree", fit: "contain", bg: "#ffffff" },
  { src: img("page-1.jpg"), title: "Bonfire", fit: "contain", bg: "#000000" },
];
