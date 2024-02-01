function getMonth(date: Date) {
	return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

export function formatDate(date: Date) {
	return `${date.getDate()} ${getMonth(date)}, ${date.getFullYear()}`;
}

export function getDaysDiff(date: Date, from: Date = new Date()): number {
	const timeDiff = Math.abs(date.getTime() - from.getTime());
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
