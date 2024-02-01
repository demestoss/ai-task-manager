<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();
</script>

<div {...props} class={cn('flex items-center p-6 pt-0', props.class)}>
	<slot />
</div>
