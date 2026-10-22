# ubiquitous-palm-tree

A React + Vite app for participants on an employability programme. The participant
scores themselves from 1 to 10 on five questions, and the answers are plotted live on a
spider (radar) diagram, their "employability star".

## Questions

1. **Confidence**: How confident do you feel about getting into work?
2. **Communication**: How comfortable are you talking to new people, such as employers or colleagues?
3. **CV & Applications**: How ready is your CV, and how confident are you filling in job applications?
4. **Interview Skills**: How prepared do you feel for a job interview?
5. **Work Readiness**: How ready are you for a working routine (timekeeping, travel, childcare and so on)?

Edit `src/questions.js` to change the wording or the questions; the chart adapts to the list.

The page also shows the average score, strongest area and area to focus on, and can be
printed or saved as a PDF.

### Distance travelled

Press **Save as starting point** to keep today's scores. At later check-ins the starting
point is drawn as a dashed orange outline behind the current scores, and a table shows the
change in each area. Scores and the starting point are saved in the browser on that device
only (`localStorage`); nothing is sent to a server.

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
