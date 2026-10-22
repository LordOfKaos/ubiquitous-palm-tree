// Made-up coach data, used until the app is connected to a real case-management system.
// Dates are set relative to today so the demo always looks current.

function at(daysFromToday, hour = 9, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const COACH = { name: 'Jordan Ellis', role: 'Your job coach' };

export const SAMPLE_MESSAGES = [
  {
    id: 'msg-care-job',
    sentAt: at(0, 8, 45),
    type: 'nudge',
    text: 'I spotted a new Care Assistant job near you that fits around school hours. Have a look and save it if you’re interested, and we can go through it at our next meeting.',
    link: { href: '#jobs', label: 'View jobs' },
  },
  {
    id: 'msg-cv-praise',
    sentAt: at(-1, 15, 20),
    type: 'praise',
    text: 'Great work finishing your CV! The new personal statement really shows off your customer service experience. 🎉',
  },
  {
    id: 'msg-star',
    sentAt: at(-3, 11, 0),
    type: 'reminder',
    text: 'Could you update your Employability Star before our next meeting? It helps us see how far you’ve come.',
    link: { href: '#star', label: 'Update my star' },
  },
  {
    id: 'msg-workshop',
    sentAt: at(-6, 10, 30),
    type: 'info',
    text: 'There’s a free interview skills workshop at the Job Centre next week. Let me know if you’d like me to book you a place.',
  },
];

export const SAMPLE_MEETINGS = [
  {
    id: 'mtg-review',
    start: at(2, 10, 30),
    durationMinutes: 45,
    title: 'Progress review with Jordan',
    format: 'In person',
    location: 'Employment Hub, 12 Market Street',
    notes: 'Bring your updated CV (curriculum vitae) and any jobs you’ve saved.',
  },
  {
    id: 'mtg-mock-interview',
    start: at(6, 14, 0),
    durationMinutes: 60,
    title: 'Mock interview practice',
    format: 'Video call',
    location: 'Link sent by email',
    notes: 'We’ll practise common questions for care and retail roles.',
  },
  {
    id: 'mtg-workshop',
    start: at(9, 10, 0),
    durationMinutes: 120,
    title: 'Interview skills workshop',
    format: 'Group session',
    location: 'Job Centre, Room 3',
    notes: 'Optional. Tell Jordan if you’d like a place.',
  },
];

export const SAMPLE_ACTIONS = [
  { id: 'act-cv', text: 'Finish updating my CV', due: at(-1), doneByDefault: true },
  { id: 'act-save-jobs', text: 'Save at least 3 jobs I’d like to apply for', due: at(1) },
  { id: 'act-star', text: 'Update my Employability Star', due: at(2) },
  { id: 'act-references', text: 'Ask two people to be my references', due: at(5) },
  { id: 'act-bus', text: 'Check bus times to the retail park', due: at(-2) },
];
