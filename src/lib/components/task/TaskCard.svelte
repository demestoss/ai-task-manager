<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import {
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import type { Task } from '$lib/server/modules/task/model';
	import TaskIcon from '$lib/components/task/TaskIcon.svelte';
	import { Button } from '$lib/components/ui/button';
	import TaskPriority from '$lib/components/task/TaskPriority.svelte';
	import TaskDueDate from '$lib/components/task/TaskDueDate.svelte';

	type Events = {
		remove: () => void;
	};

	let { name, category, description, dueDate, priority, remove } = $props<Task & Events>();
</script>

<Card class="flex">
	{#if category}
		<div class="mr-[-12px]">
			<TaskIcon {category} />
		</div>
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
			{#if priority}
				<TaskPriority {priority} />
			{/if}
			<CardDescription>
				{description}
			</CardDescription>
		</CardContent>

		<CardFooter class="flex justify-end">
			<Button type="button" variant="destructive" onclick={remove}>Delete</Button>
		</CardFooter>
	</div>
</Card>
