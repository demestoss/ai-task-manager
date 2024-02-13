<script lang="ts">
	import { getDueType } from './utils';
	import { type Timestamp, formatTimestamp } from '@repo/date-utils/timestamp';
	import { Clock } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import type { DueType } from '@repo/domain/task';

	let { dueDate: dueDateTimestamp } = $props<{ dueDate: Timestamp }>();

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

	let dueType = $derived(getDueType(dueDateTimestamp));

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
	{formatTimestamp(dueDateTimestamp)}
</span>
