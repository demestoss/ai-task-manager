<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { FinishedTaskCard } from '$lib/components/finished-task';
	import { makeClient } from '$lib/make-client';

	let { data } = $props();
	const client = makeClient(fetch);

	async function handleRestore(id: string) {
		try {
			await client.v1['finished-tasks'][':id'].return.$post({
				param: { id }
			});
			await Promise.all([
				invalidate(client.v1.tasks.$url()),
				invalidate(client.v1['finished-tasks'].$url())
			]);
		} catch (e) {
			console.error(e);
		}
	}
</script>

{#if data.tasks.length === 0}
	<p class="leading-7 [&:not(:first-child)]:mt-6">
		You haven't finished any task yet. Let's work on it!
	</p>
{:else}
	<ul class="space-y-2">
		{#each data.tasks as task (task.id)}
			<li>
				<FinishedTaskCard {...task} restore={() => handleRestore(task.id)} />
			</li>
		{/each}
	</ul>
{/if}
