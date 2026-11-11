# Lupo Portfolio

Portfolio website of **Lupo**, an illustrator and cover artist based in Hamburg, Germany. The site shows atmospheric, painterly illustration and concept art (characters, dark fantasy worlds, book covers) and is aimed at opportunities in game art, concept art and visual development.

Live site: https://srnux.github.io/lupo-portfolio-site/

## What's on the site

- **Hero:** a looping video background with animated ember dust, the Lupo logo, and a short introduction.
- **Gallery:** illustration and concept art in one ordered grid. A few featured works show first; "more" reveals the rest. Clicking a work opens it in a lightbox (Esc closes it, ← / → move between works).
- **About me:** background, studies (Illustration at HAW Hamburg) and goals.
- **Footer:** contact email, portfolio download and copyright notice.
- **Languages:** English and German, switchable in the header.

## Repository layout

| Path | Contents |
| --- | --- |
| [app/](app/) | The website: React + Vite + TypeScript. See [app/README.md](app/README.md) for where copy, images and components live. |
| [.github/workflows/deploy.yml](.github/workflows/deploy.yml) | Builds `app/` and deploys it to GitHub Pages on every push to `main`. |

## Running locally

```sh
cd app
pnpm install
pnpm dev        # http://localhost:5181
pnpm build      # outputs to app/dist/
```

## Copyright

All artwork, videos and texts are © Lupo, all rights reserved. No licence is granted to use, copy or train on them. See [LICENSE](LICENSE) for details.
