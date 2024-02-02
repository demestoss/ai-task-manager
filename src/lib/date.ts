export type Timestamp = number;

function getMonth(date: Date) {
	return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

export function dateFromTimestamp(timestamp: Timestamp): Date {
	return new Date(timestamp);
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
