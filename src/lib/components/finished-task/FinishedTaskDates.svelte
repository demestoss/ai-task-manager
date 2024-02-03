<script lang="ts">
	import { formatTimestamp, getDaysDiffTimestamp, type Timestamp } from '$lib/date';
	import { cn } from '$lib/utils';

	let { dueDate, resolutionDate, createdAt } = $props<{
		dueDate?: Timestamp;
		createdAt: Timestamp;
		resolutionDate: Timestamp;
	}>();
</script>

<div class="flex space-x-3">
	<div>
		<b class="text-sm font-medium leading-none">Created: </b>
		<span class="text-sm">{formatTimestamp(createdAt)}</span>
	</div>

	<div>
		<b class="text-sm font-medium leading-none">Finished: </b>
		<span class="text-sm">{formatTimestamp(resolutionDate)}</span>
	</div>
</div>

{#if dueDate}
	{@const daysBeforeDeadline = getDaysDiffTimestamp(resolutionDate, dueDate)}

	<div class={`flex space-x-3 mt-4`}>
		<b class="text-sm font-medium leading-none">Deadline: </b>
		<span class="text-sm">{formatTimestamp(dueDate)}, resolved in</span>
		<span
			class={cn(
				'text-sm',
				daysBeforeDeadline < 0 && 'text-red-500',
				daysBeforeDeadline > 0 && 'text-green-500'
			)}
		>
			{#if daysBeforeDeadline === 0}
				time
			{:else if daysBeforeDeadline > 0}
				{daysBeforeDeadline} before deadline
			{:else if daysBeforeDeadline < 0}
				{daysBeforeDeadline} after deadline
			{/if}
		</span>
	</div>
{/if}
