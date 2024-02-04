<script lang="ts">
	import type { TaskCategory } from '@repo/api';
	import Code from 'lucide-svelte/icons/code';
	import Bath from 'lucide-svelte/icons/bath';
	import Fish from 'lucide-svelte/icons/fish';
	import ShieldQuestion from 'lucide-svelte/icons/shield-question';
	import Plane from 'lucide-svelte/icons/plane';
	import Book from 'lucide-svelte/icons/book';
	import { cn } from '$lib/utils';

	let { category } = $props<{ category: TaskCategory }>();

	function getStyleByCategory() {
		switch (category) {
			case 'coding':
				return 'text-red-500 border-red-500  bg-red-50';
			case 'home':
				return 'text-green-500 border-green-500 bg-green-50';
			case 'hobby':
				return 'text-yellow-500 border-yellow-500 bg-yellow-50';
			case 'work':
				return 'text-blue-500 border-blue-500 bg-blue-50';
			case 'reading':
				return 'text-purple-500 border-purple-500 bg-purple-50';
			case 'other':
				return 'text-gray-500 border-gray-500 bg-gray-50';
		}
	}
</script>

<div class="mr-[-12px] ml-[-1px]">
	<div class={cn(`border-l-4 ${getStyleByCategory()} pl-2 pr-2 pt-4 h-full rounded`)}>
		{#if category === 'coding'}
			<Code class="size-8" />
		{:else if category === 'home'}
			<Bath class="size-8" />
		{:else if category === 'hobby'}
			<Fish class="size-8" />
		{:else if category === 'work'}
			<Plane class="size-8" />
		{:else if category === 'reading'}
			<Book class="size-8" />
		{:else if category === 'other'}
			<ShieldQuestion class="size-8" />
		{/if}
	</div>
</div>
