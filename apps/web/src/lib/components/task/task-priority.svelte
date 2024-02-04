<script lang="ts">
	import type { TaskPriority } from '@repo/api';
	import { Badge } from '$lib/components/ui/badge';

	let { priority } = $props<{ priority: TaskPriority }>();
</script>

{#if priority === 'useless'}
	<Badge variant="outline">Shit 💩</Badge>
{:else if priority === 'high'}
	<Badge variant="destructive">Urgent</Badge>
{:else if priority === 'medium'}
	<Badge variant="default">Medium</Badge>
{:else if priority === 'low'}
	<Badge variant="secondary">Lowest</Badge>
{/if}
