# ubiquitous-palm-tree

A simple website demonstrating core React concepts, built with React + Vite.

## Demos

| Card | Concept |
| --- | --- |
| Counter | `useState` |
| Todo list | Controlled inputs, rendering lists with `.map()` and `key` |
| Clock | `useEffect` with interval cleanup |
| Profile cards | Props and reusable components |
| Dark mode toggle | Lifting state to a parent / conditional class names |

## Running locally

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deployment

Pushes to `main` deploy the site to GitHub Pages via `.github/workflows/deploy.yml`.
One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
The site is then served at https://lordofkaos.github.io/ubiquitous-palm-tree/.
