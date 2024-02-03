<script lang="ts">
	import FinishedTaskDates from './finished-task-dates.svelte';
	import TaskIcon from '../task/task-icon.svelte';
	import TaskPriority from '../task/task-priority.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$lib/components/ui/card';
	import { CardTitle } from '$lib/components/ui/card/index.js';
	import { getDaysDiffTimestamp } from '$lib/date';
	import type { FinishedTask } from '$lib/server/modules/finished-task/model';

	type Events = {
		restore: () => void;
	};

	let { name, category, dueDate, priority, createdAt, resolutionDate, restore } = $props<
		FinishedTask & Events
	>();
</script>

<Card class="flex">
	{#if category}
		<TaskIcon {category} />
	{/if}

	<div class="grow">
		<CardHeader>
			<div class="flex justify-between">
				<CardTitle tag="h3">
					{name}
				</CardTitle>

				<span class="text-sm text-muted-foreground">
					spend {getDaysDiffTimestamp(createdAt, resolutionDate) || 1} days
				</span>
			</div>
		</CardHeader>

		<CardContent class="space-y-3">
			<FinishedTaskDates {dueDate} {createdAt} {resolutionDate} />
		</CardContent>

		<CardFooter class="flex justify-between">
			{#if priority}
				<TaskPriority {priority} />
			{/if}

			<Button type="button" variant="default" onclick={restore}>Restore</Button>
		</CardFooter>
	</div>
</Card>
