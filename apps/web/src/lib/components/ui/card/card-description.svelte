<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLParagraphElement>;

	let { ...props } = $props<Props>();
</script>

<p {...props} class={cn('text-sm text-muted-foreground text-wrap break-all', props.class)}>
	<slot />
</p>
