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

	type Events = {
		remove: () => void;
	};

	let { name, category, description, dueDate, priority, remove } = $props<
		Omit<Task, 'dueDate'> & { dueDate?: string } & Events
	>();
</script>

<Card>
	{#if category}
		<TaskIcon {category} />
	{/if}

	<CardHeader>
		<div class="flex justify-between">
			<CardTitle tag="h3">
				{name}
			</CardTitle>

			{#if dueDate}
				<span class="text-sm text-muted-foreground">{dueDate}</span>
			{/if}
		</div>
	</CardHeader>

	<CardContent>
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
</Card>
