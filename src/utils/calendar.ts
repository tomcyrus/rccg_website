/**
 * Generates an .ics calendar file download for RCCG Kingdom First Assembly services
 */
export function downloadServiceIcs(type: 'sunday' | 'wednesday') {
  const isSunday = type === 'sunday';
  const title = isSunday
    ? 'Sunday Worship Service - RCCG Kingdom First Assembly'
    : 'Midweek Bible Study - RCCG Kingdom First Assembly';
  const desc = isSunday
    ? 'Sunday Worship Service at RCCG Kingdom First Assembly. Seeking His Kingdom First. Sharing His Love With All.'
    : 'Midweek Bible Study with RCCG Kingdom First Assembly. Growing rooted in God\'s Word and prayer.';
  const location = '121 E 2nd Ave, Roselle, NJ 07203 (Temporary Worship Location)';
  
  // Set next upcoming date
  const now = new Date();
  const targetDay = isSunday ? 0 : 3; // 0 = Sun, 3 = Wed
  const daysUntil = (targetDay + 7 - now.getDay()) % 7 || 7;
  const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntil);
  
  const startHour = isSunday ? 9 : 19;
  const startMinute = 0;
  const endHour = isSunday ? 11 : 20;
  const endMinute = isSunday ? 0 : 30;

  const formatDate = (d: Date, hour: number, minute: number) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const h = String(hour).padStart(2, '0');
    const m = String(minute).padStart(2, '0');
    return `${year}${month}${day}T${h}${m}00`;
  };

  const dtStart = formatDate(eventDate, startHour, startMinute);
  const dtEnd = formatDate(eventDate, endHour, endMinute);
  const rrule = isSunday ? 'RRULE:FREQ=WEEKLY;BYDAY=SU' : 'RRULE:FREQ=WEEKLY;BYDAY=WE';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//RCCG Kingdom First Assembly//Worship Schedule//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${location}`,
    `DTSTART:${dtStart}`,
    `DTEnd:${dtEnd}`,
    rrule,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${type}-worship-rccg-kfa.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(type: 'sunday' | 'wednesday'): string {
  const isSunday = type === 'sunday';
  const text = encodeURIComponent(
    isSunday
      ? 'Sunday Worship Service - RCCG Kingdom First Assembly'
      : 'Midweek Bible Study - RCCG Kingdom First Assembly'
  );
  const details = encodeURIComponent(
    'RCCG Kingdom First Assembly. Seeking His Kingdom First. Sharing His Love With All. 121 E 2nd Ave, Roselle, NJ 07203'
  );
  const location = encodeURIComponent('121 E 2nd Ave, Roselle, NJ 07203');
  const recurrence = encodeURIComponent(isSunday ? 'RRULE:FREQ=WEEKLY;BYDAY=SU' : 'RRULE:FREQ=WEEKLY;BYDAY=WE');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}&recur=${recurrence}`;
}

export interface GenericCalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate?: string; // YYYY-MM-DD or ISO string
  time?: string;
  dayOfWeek?: string;
}

export function downloadCustomEventIcs(event: {
  title: string;
  description: string;
  location: string;
  time: string;
  frequency?: string;
}) {
  const title = `${event.title} - RCCG Kingdom First Assembly`;
  const desc = `${event.description}\n\nTime: ${event.time}\nLocation: ${event.location}\nRCCG Kingdom First Assembly · Roselle, NJ`;
  const location = event.location;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const dtStart = `${year}${month}${day}T100000`;
  const dtEnd = `${year}${month}${day}T120000`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//RCCG Kingdom First Assembly//Church Calendar//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${title.replace(/[\r\n]+/g, ' ')}`,
    `DESCRIPTION:${desc.replace(/[\r\n]+/g, '\\n')}`,
    `LOCATION:${location.replace(/[\r\n]+/g, ' ')}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const sanitizedTitle = event.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
  link.setAttribute('download', `${sanitizedTitle}-rccg-kfa.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getCustomEventGoogleCalendarUrl(event: {
  title: string;
  description: string;
  location: string;
  time: string;
}): string {
  const text = encodeURIComponent(`${event.title} - RCCG Kingdom First Assembly`);
  const details = encodeURIComponent(
    `${event.description}\n\nTime: ${event.time}\nLocation: ${event.location}\nRCCG Kingdom First Assembly · Seeking His Kingdom First`
  );
  const location = encodeURIComponent(event.location);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}`;
}

