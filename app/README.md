# Lupo Portfolio (React)

React + Vite + TypeScript version of the `Lupo Portfolio.dc.html` design in the repo root.

```sh
npm install
npm run dev      # http://localhost:5181
npm run build    # outputs to dist/
npm run preview
```

## Where things live

| What | File |
| --- | --- |
| Copy (EN/DE), email, portfolio file, gallery order and titles | `src/content.ts` |
| Artwork and hero video (copied from `Portoflio image small/`) | `public/images/` |
| Page layout and behaviour | `src/App.tsx` |
| Header, language toggle, menu | `src/components/Header.tsx` |
| Galleries with "more / less" | `src/components/Gallery.tsx` |
| Click-to-enlarge viewer (Esc, ← / →) | `src/components/Lightbox.tsx` |
| Animated dust plumes (port of `hero-dust.js`) | `src/components/DustCanvas.tsx` |
| Header hides on scroll down, shows on scroll up | `src/hooks/useHideOnScroll.ts` |
| Design tokens, cursor, grain, responsive rules | `src/styles.css` |

To add a work: drop the image in `public/images/` and add a line to `ILLUSTRATIONS` or `CONCEPTS` in `src/content.ts`.

The footer "Portfolio" link downloads `public/lupo-portfolio.pdf`. Add that file, or change `SITE.portfolioFile`.
