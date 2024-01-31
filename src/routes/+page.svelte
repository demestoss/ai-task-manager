<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { makeClient } from '$lib/make-client';
	import { Input } from '$lib/components/ui/input';
	import { CardContent, CardTitle, Card, CardHeader } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();
	const client = makeClient(fetch);

	let isLoading = $state(false);
	let taskName = $state('');

	async function handleRemove(id: string) {
		try {
			isLoading = true;
			await client.v1.tasks[':id'].$delete({
				param: { id }
			});
			await invalidate(client.v1.tasks.$url());
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}
</script>

<h1
	class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
	AITM: The best task manager powered by AI
</h1>

<Card>
	<CardHeader>
		<CardTitle tag="h2">New task:</CardTitle>
	</CardHeader>

	<CardContent>
		<form method="POST" use:enhance>
			<Input
				type="text"
				name="name"
				required
				autofocus
				disabled={isLoading}
				bind:value={taskName}
			/>

			<Button type="submit" disabled={isLoading}>Add</Button>
		</form>
	</CardContent>
</Card>
