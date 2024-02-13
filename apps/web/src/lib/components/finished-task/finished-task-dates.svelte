<script lang="ts">
	import {
		formatTimestamp,
		getDaysDiffTimestamp,
		type Timestamp
	} from '@repo/date-utils/timestamp';
	import { cn } from '$lib/utils';

	let { dueDate, resolutionDate, createdAt } = $props<{
		dueDate?: Timestamp;
		createdAt: Timestamp;
		resolutionDate: Timestamp;
	}>();
</script>

<div class="flex gap-20">
	<div class="flex flex-col gap-1.5">
		<b class="text-s font-medium leading-none">Created: </b>
		<span class="text-s">{formatTimestamp(createdAt)}</span>
	</div>

	<div class="flex flex-col gap-1.5">
		<b class="text-s font-medium leading-none">Finished: </b>
		<span class="text-s">{formatTimestamp(resolutionDate)}</span>
	</div>

	{#if dueDate}
		{@const daysBeforeDeadline = getDaysDiffTimestamp(resolutionDate, dueDate)}

		<div class={`flex flex-col gap-1.5`}>
			<b class="text-s font-medium leading-none">Deadline: </b>
			<span class="text-s">{formatTimestamp(dueDate)}</span>
		</div>

		<div class="flex flex-col gap-1.5">
			<b class="text-s font-medium leading-none">Resolved in: </b>
			<span
				class={cn(
					'text-s',
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
</div>
