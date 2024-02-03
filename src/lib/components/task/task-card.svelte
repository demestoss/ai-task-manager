<script lang="ts">
	import { getDueType } from '$lib/components/task/utils';
	import { Card } from '$lib/components/ui/card';
	import {
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import type { TaskViewModel } from '$lib/server/modules/task/model';
	import TaskIcon from './task-icon.svelte';
	import { Button } from '$lib/components/ui/button';
	import TaskPriority from './task-priority.svelte';
	import TaskDueDate from './task-due-date.svelte';

	type Events = {
		remove: () => void;
		finish: () => void;
	};

	let { name, category, description, dueDate, priority, remove, finish } = $props<
		TaskViewModel & Events
	>();
</script>

<div
	class={(getDueType(dueDate) === 'due-date' && priority === 'medium') || priority === 'high'
		? 'urgent'
		: ''}
>
	<Card class="flex hover:shadow-md transition-all hover:scale-105">
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
					<Button type="button" variant="destructive" onclick={remove}>Delete</Button>
					<Button type="button" variant="default" onclick={finish}>Finish</Button>
				</div>
			</CardFooter>
		</div>
	</Card>
</div>

<style>
	.urgent {
		position: relative;
		background: linear-gradient(0deg, #000, #272727);
		border-radius: 10px;
	}

	.urgent:before,
	.urgent:after {
		content: '';
		position: absolute;
		left: -2px;
		top: -2px;
		background: linear-gradient(
			45deg,
			#fb0094,
			/*#0000ff,
			#00ff00,
			#ffff00,
			#ff0000,
			/*#fb0094,*! #0000ff,*/ /*#00ff00,*/ /*#ffff00,*/ #ff0000,
			#ed3326
		);
		background-size: 400%;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		border-radius: 10px;
		z-index: -1;
		animation: steam 20s linear infinite;
	}

	@keyframes steam {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 400% 0;
		}
		100% {
			background-position: 0 0;
		}
	}

	.urgent:after {
		filter: blur(15px);
	}
</style>
