<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();
</script>

<div {...props} class={cn('p-6 pt-0', props.class)}>
	<slot />
</div>
