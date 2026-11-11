export type Lang = "en" | "de";

export const COPY = {
  en: {
    navGallery: "Gallery",
    navAbout: "About me",
    aboutTitle: "About me",
    download: "Portfolio",
    contact: "Contact",
    more: "more",
    less: "less",
    backToStart: "Back to start",
    menu: "Menu",
    close: "Close",
    rights: "All rights reserved.",
    legal:
      "All images and content on this website are the author's work and protected by copyright. Any use, reproduction, distribution or modification – including downloading, copying, screenshots or use for AI training – is prohibited without the author's prior written consent.",
    aboutBody:
      "I'm an illustrator and cover artist based in Hamburg, Germany, currently studying Illustration at HAW Hamburg.\n\nI create character- and story-driven artwork that explores fantastical themes and darker worlds. My painterly approach combines the rich textures of traditional illustration with the flexibility of digital media. Through atmospheric imagery and imaginative settings, I aim to spark curiosity and hint at stories beyond the frame.\n\nI'm looking to bring this approach to games through opportunities in game art, concept art, and visual development. I'm eager to keep learning, collaborate with other creatives, and help bring compelling characters and worlds to life.",
  },
  de: {
    navGallery: "Galerie",
    navAbout: "Über mich",
    aboutTitle: "Über mich",
    download: "Portfolio",
    contact: "Kontakt",
    more: "mehr",
    less: "weniger",
    backToStart: "Zurück zum Anfang",
    menu: "Menü",
    close: "Schließen",
    rights: "Alle Rechte vorbehalten.",
    legal:
      "Sämtliche Bilder und Inhalte dieser Website sind Werke des Urhebers und urheberrechtlich geschützt. Jede Nutzung, Vervielfältigung, Verbreitung oder Bearbeitung – einschließlich Download, Kopie, Screenshot oder Verwendung für KI-Training – ist ohne vorherige schriftliche Zustimmung des Urhebers untersagt.",
    aboutBody:
      "Ich bin Illustrator und Coverkünstler aus Hamburg und studiere derzeit Illustration an der HAW Hamburg.\n\nIm Mittelpunkt meiner Arbeit stehen Charaktere und ihre Geschichten, oft eingebettet in fantastische Themen und düstere Welten. Mein malerischer Ansatz verbindet die vielfältigen Texturen traditioneller Illustration mit der Flexibilität digitaler Medien. Mit atmosphärischen Bildern und fantasievollen Schauplätzen möchte ich Neugier wecken und Geschichten andeuten, die über den Bildrand hinausreichen.\n\nDiesen Ansatz möchte ich auch in die Spieleentwicklung einbringen und suche nach Möglichkeiten in den Bereichen Game Art, Concept Art und Visual Development. Ich freue mich darauf, mich weiterzuentwickeln, mit anderen Kreativen zusammenzuarbeiten und gemeinsam spannende Charaktere und Welten zum Leben zu erwecken.",
  },
} satisfies Record<Lang, Record<string, string>>;

export type Copy = (typeof COPY)[Lang];

/** Site settings (formerly the editable props of the .dc.html design). */
export const SITE = {
  /** Copyright holder named in the footer and lightbox. */
  author: "Lupo",
  email: "lupo@lupoart.de",
  /** Downloadable portfolio file, served from /public. */
  portfolioFile: `${import.meta.env.BASE_URL}lupo-portfolio.pdf`,
  heroVideo: `${import.meta.env.BASE_URL}images/timeline-1.mp4`,
  /** First frame of the hero video, shown while it loads. */
  heroPoster: `${import.meta.env.BASE_URL}images/timeline-1-poster.jpg`,
};

export type Work = {
  src: string;
  title: string;
  /** Shown straight away; the rest appear once "more" is clicked. */
  featured?: boolean;
  /** Landscape work: spans two grid columns instead of one portrait frame. */
  wide?: boolean;
  /** "contain" letterboxes the image inside its frame instead of cropping it. */
  fit?: "cover" | "contain";
  /** Frame background behind a letterboxed ("contain") image. */
  bg?: string;
};

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

/**
 * Every work in the gallery, in display order.
 * - Move a line up or down to change its position on the site.
 * - `featured: true` marks the works shown before "more" is clicked
 *   (they keep their order from this list).
 * - A new image goes into public/images and needs a line here to appear.
 */
export const WORKS: Work[] = [
  { src: img("david.jpg"), title: "David", featured: true },
  { src: img("death-claims-nike.jpg"), title: "Death claims Nike", featured: true },
  { src: img("hades.jpg"), title: "Hades", featured: true },
  { src: img("wanderer.jpg"), title: "Wanderer", featured: true, wide: true },
  { src: img("cavalier-portrait.jpeg"), title: "Cavalier" },
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
  { src: img("soulstree-concept.jpg"), title: "Soulstree" },
  { src: img("page-1.jpg"), title: "Bonfire" },
];
