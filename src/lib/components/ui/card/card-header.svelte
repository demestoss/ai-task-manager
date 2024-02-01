<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();

	let className: Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
	<slot />
</div>
