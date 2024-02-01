import type { TaskCategory, TaskPriority } from '$lib/server/modules/task/model';
import type { TaskCreateInput, TaskCreateModel } from '$lib/server/modules/task/ask';

const priorities: TaskPriority[] = ['high', 'low', 'medium', 'useless'];
const categories: TaskCategory[] = ['coding', 'hobby', 'home', 'work', 'other', 'reading'];

export async function makeTaskPrediction(task: TaskCreateInput): Promise<TaskCreateModel> {
	return {
		description: randomText(randomIntInRange(50, 255)),
		priority: randomItemFromArray(priorities),
		category: task.category ?? randomItemFromArray(categories),
		dueDate: randomDateFromNow(new Date('2024-05-20')),
		...task
	};
}

function randomDateFromNow(date: Date): Date {
	return randomDate(new Date(), date);
}

function randomDate(start: Date, end: Date): Date {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomItemFromArray<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomText(length: number): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 	';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function randomIntInRange(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}
