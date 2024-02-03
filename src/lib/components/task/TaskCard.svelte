<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import {
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import type { TaskViewModel } from '$lib/server/modules/task/model';
	import TaskIcon from '$lib/components/task/TaskIcon.svelte';
	import { Button } from '$lib/components/ui/button';
	import TaskPriority from '$lib/components/task/TaskPriority.svelte';
	import TaskDueDate from '$lib/components/task/TaskDueDate.svelte';

	type Events = {
		remove: () => void;
		finish: () => void;
	};

	let { name, category, description, dueDate, priority, remove, finish } = $props<
		TaskViewModel & Events
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

				{#if dueDate}
					<TaskDueDate {dueDate} />
				{/if}
			</div>
		</CardHeader>

		<CardContent class="space-y-3">
			<CardDescription>
				{description}
			</CardDescription>
		</CardContent>

		<CardFooter class="flex justify-between space-x-3">
			{#if priority}
				<TaskPriority {priority} />
			{/if}

			<div class="space-x-3">
				<Button type="button" variant="default" onclick={finish}>Finish</Button>
				<Button type="button" variant="destructive" onclick={remove}>Delete</Button>
			</div>
		</CardFooter>
	</div>
</Card>
