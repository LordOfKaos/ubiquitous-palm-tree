const DAY = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Whole days from today to the given date: 0 today, 1 tomorrow, -1 yesterday.
export function daysFromToday(iso) {
  return Math.round((startOfDay(iso) - startOfDay(new Date())) / DAY);
}

export function relativeDay(iso) {
  const days = daysFromToday(iso);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 1 && days < 7) return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long' });
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function time(iso) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' });
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

// Calendar files need commas, semicolons and backslashes escaped in text fields.
const escapeText = (text) => text.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

// Downloads a calendar file so the participant can add a meeting to their phone's calendar.
export function downloadCalendarFile(meeting) {
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const start = new Date(meeting.start);
  const end = new Date(start.getTime() + meeting.durationMinutes * 60 * 1000);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Employability Hub//EN',
    'BEGIN:VEVENT',
    `UID:${meeting.id}@employability-hub`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeText(meeting.title)}`,
    `LOCATION:${escapeText(meeting.location)}`,
    `DESCRIPTION:${escapeText(meeting.notes)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${meeting.id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
