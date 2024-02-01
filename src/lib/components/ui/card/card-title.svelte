<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { HeadingLevel } from '.';

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	let { tag = 'h3', ...props } = $props<Props>();

	let className: Props['class'] = undefined;
	export { className as class };
</script>

<svelte:element
	this={tag}
	class={cn('text-lg font-semibold leading-none tracking-tight', className)}
	{...props}
>
	<slot />
</svelte:element>
