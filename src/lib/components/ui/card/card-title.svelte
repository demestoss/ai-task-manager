<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { HeadingLevel } from '.';

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	let { tag = 'h3', ...props } = $props<Props>();
</script>

<svelte:element
	this={tag}
	{...props}
	class={cn('text-lg font-semibold leading-none tracking-tight', props.class)}
>
	<slot />
</svelte:element>
