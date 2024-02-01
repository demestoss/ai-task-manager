<script lang="ts">
	import type { TaskCategory } from '$lib/server/modules/task/model';
	import { Code, Home, Fish, ShieldQuestion, Plane, Book } from 'lucide-svelte';

	let { category } = $props<{ category: TaskCategory }>();
</script>

{#if category === 'coding'}
	<Code />
{:else if category === 'home'}
	<Home />
{:else if category === 'hobby'}
	<Fish />
{:else if category === 'work'}
	<Plane />
{:else if category === 'reading'}
	<Book />
{:else if category === 'other'}
	<ShieldQuestion />
{/if}
