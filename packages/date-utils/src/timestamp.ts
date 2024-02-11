import { type DateFormat, formatDate, getDaysDiff, isFutureDate } from './index';

export type Timestamp = number;

export function dateFromTimestamp(timestamp: Timestamp): Date {
  return new Date(timestamp);
}

export function formatTimestamp(timestamp: Timestamp, format?: DateFormat): string {
  return formatDate(dateFromTimestamp(timestamp), format);
}

export function isFutureTimestamp(date: Timestamp): boolean {
  return isFutureDate(dateFromTimestamp(date));
}

export function getDaysDiffTimestamp(from: Timestamp, to: Timestamp): number {
  return getDaysDiff(dateFromTimestamp(from), dateFromTimestamp(to));
}
