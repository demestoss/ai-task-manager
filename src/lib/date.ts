function getMonth(date: Date) {
	return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

export function formatDate(date: Date) {
	return `${date.getDate()} ${getMonth(date)}, ${date.getFullYear()}`;
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

export type Timestamp = number;

export function dateFromTimestamp(timestamp: Timestamp): Date {
	return new Date(timestamp);
}

export function formatTimestamp(timestamp: Timestamp): string {
	return formatDate(dateFromTimestamp(timestamp));
}

export function isFutureTimestamp(date: Timestamp): boolean {
	return isFutureDate(dateFromTimestamp(date));
}

export function getDaysDiffTimestamp(from: Timestamp, to: Timestamp): number {
	return getDaysDiff(dateFromTimestamp(from), dateFromTimestamp(to));
}
