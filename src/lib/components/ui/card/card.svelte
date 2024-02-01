<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();
</script>

<div {...props} class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)}>
	<slot />
</div>
