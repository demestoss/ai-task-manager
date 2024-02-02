<script lang="ts">
	import TaskIcon from '$lib/components/task/TaskIcon.svelte';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import { CardTitle } from '$lib/components/ui/card/index.js';
	import type { FinishedTask } from '$lib/server/modules/finished-task/model';

	type Events = {
		restore: () => void;
	};

	let { name, category, description, dueDate, priority, resolutionDate, restore } = $props<
		FinishedTask & Events
	>();
</script>

<Card>
	{#if category}
		<TaskIcon {category} />
	{/if}

	<CardHeader>
		<CardTitle>
			{name}
		</CardTitle>
	</CardHeader>
</Card>