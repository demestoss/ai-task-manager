<script lang="ts">
	import type { FinishedTask } from '$lib/server/modules/finished-task/model';

	type Events = {
		restore: () => void;
	};

	let { name, category, description, dueDate, priority, resolutionDate, restore } = $props<
		FinishedTask & Events
	>();
</script>
