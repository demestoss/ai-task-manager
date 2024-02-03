import { getDaysDiff, type Timestamp } from '$lib/date';
import type { DueType } from '$lib/server/modules/task/model';

export function getDueType(dueDate?: Timestamp): DueType {
	if (!dueDate) {
		return 'not-due';
	}

	const diff = getDaysDiff(new Date(), new Date(dueDate));

	if (diff < 0) {
		return 'over-due';
	} else if (diff >= 0 && diff <= 1) {
		return 'due-date';
	} else if (diff < 10) {
		return 'close-to-due';
	} else {
		return 'not-due';
	}
}
