<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { makeClient } from '$lib/make-client';
	import { Input } from '$lib/components/ui/input';
	import { CardContent, CardTitle, Card, CardHeader } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { TaskCard } from '$lib/components/task';
	import { CardFooter } from '$lib/components/ui/card/index.js';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	const client = makeClient(fetch);

	let isLoading = $state(false);
	let taskName = $state('');

	async function handleRestore(id: string) {
		try {
			await client.api.v1.tasks[':id'].restore.$post({
				param: { id }
			});
			await invalidate(client.api.v1.tasks.$url());
		} catch (e) {
			console.error(e);
		}
	}

	async function handleRemove(id: string) {
		try {
			isLoading = true;
			await client.api.v1.tasks[':id'].$delete({
				param: { id }
			});
			await invalidate(client.api.v1.tasks.$url());
			toast.success('The task was successfully deleted', {
				description: 'Do you wnt to restore it?',
				action: {
					label: 'Undo',
					onClick: () => handleRestore(id)
				}
			});
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	async function handleFinish(id: string) {
		try {
			isLoading = true;
			await client.api.v1.tasks[':id'].finish.$post({
				param: { id }
			});
			await invalidate(client.api.v1.tasks.$url());
			await invalidate(client.api.v1['finished-tasks'].$url());
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}
</script>

<Card class="mb-10">
	<form method="POST" use:enhance>
		<CardHeader>
			<CardTitle tag="h2">New task:</CardTitle>
		</CardHeader>

		<CardContent>
			<Input
				type="text"
				name="name"
				required
				autofocus
				disabled={isLoading}
				bind:value={taskName}
			/>
		</CardContent>

		<CardFooter>
			<Button type="submit" disabled={isLoading}>Add</Button>
		</CardFooter>
	</form>
</Card>

<div>
	<CardHeader>
		<CardTitle tag="h2">Current Tasks:</CardTitle>
	</CardHeader>

	<CardContent>
		{#if data.tasks.length === 0}
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				You don't have any tasks yet. Let's create one!
			</p>
		{:else}
			<ul class="space-y-2.5">
				{#each data.tasks as task (task.id)}
					<li>
						<TaskCard
							{...task}
							remove={() => handleRemove(task.id)}
							finish={() => handleFinish(task.id)}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</CardContent>
</div>
