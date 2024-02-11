export type DateFormat = 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'D MMM, YYYY';

export function formatDate(date: Date, format: DateFormat = 'D MMM, YYYY') {
  switch (format) {
    case 'D MMM, YYYY':
      return `${date.getDate()} ${getMonth(date)}, ${date.getFullYear()}`;
    case 'DD-MM-YYYY':
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    case 'MM-DD-YYYY':
      return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  }
}

function getMonth(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

export function getDaysDiff(from: Date, to: Date): number {
  const timeDiff = Math.abs(from.getTime() - to.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function isFutureDate(date: Date): boolean {
  const now = new Date().getTime();
  return date.getTime() > now;
}

export function addDays(addTo: Date, days: number): Date {
  const date = new Date(addTo.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

