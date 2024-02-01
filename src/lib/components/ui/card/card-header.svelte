<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();
</script>

<div {...props} class={cn('flex flex-col space-y-1.5 p-6', props.class)}>
	<slot />
</div>
