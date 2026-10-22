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

## Home screen

Participants land on **Home**, which brings together:

- **Your next meeting**: when, where and what to bring, with an **Add to my calendar** button
  that downloads a calendar file.
- **Messages from your job coach**: nudges, reminders and encouragement, with unread badges
  and links straight to the relevant screen.
- **My actions**: the participant's action plan, ticked off as they go, with a progress bar and
  overdue actions highlighted.
- **Coming up**: later meetings and sessions.
- **My progress**: their latest Employability Star score (and change since their starting point)
  and how many jobs they've saved.

The coach's messages, meetings and actions are currently **sample data**
(`src/home/sampleCoachData.js`), with dates set relative to today so the demo always looks
current. They all come through `fetchCoachUpdates()` in `src/home/coachSource.js`, ready to be
connected to a real case-management system. Which messages have been read and which actions
are done is remembered on the device.

## Jobs screen

The **Jobs** tab lists vacancies near the participant. They can change the town or postcode
and the distance, search by keyword, filter by hours or "No experience needed", sort by
newest or nearest, and save jobs to a shortlist to discuss with their adviser. The area and
saved jobs are remembered on the device.

The adverts are currently **sample data** (`src/jobs/sampleJobs.js`) with fictional
employers, and the screen says so. All adverts come through `fetchJobs()` in
`src/jobs/jobSource.js`; to show real vacancies, replace that function with a call to a
job-search API that returns the same shape. The default area is set in `src/jobs/config.js`.

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
