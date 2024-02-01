<script lang="ts">
	import { formatDate, getDaysDiff } from '$lib/date';
	import { Clock } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import type { DueType } from '$lib/server/modules/task/model';

	let { dueDate: dueDateStr } = $props<{ dueDate: string }>();

	function getDueType(diff: number): DueType {
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

	let dueDate = $derived(new Date(dueDateStr));
	let dueType = $derived(getDueType(getDaysDiff(dueDate)));

	function getDueColor(type: DueType) {
		switch (type) {
			case 'close-to-due':
				return 'text-amber-600';
			case 'due-date':
				return 'text-amber-600';
			case 'over-due':
				return 'text-red-700';
		}
	}

	let color = $derived(getDueColor(dueType));
</script>

<span
	class={cn(
		'flex items-center gap-1.5 text-sm text-muted-foreground',
		color,
		dueType === 'due-date' && 'underline'
	)}
>
	<Clock class="size-4" />
	{formatDate(dueDate)}
</span>
