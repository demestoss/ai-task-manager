<script lang="ts">
	import { cn } from '$lib/utils';
	import { badgeVariants, type Variant } from '.';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLSpanElement> & {
		variant: Variant;
		href?: string;
	};

	let { variant = 'default', href, ...props } = $props<Props>();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	{...props}
	class={cn(badgeVariants({ variant, className: props.class }))}
>
	<slot />
</svelte:element>
