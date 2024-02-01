<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();

	let className: Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('p-6 pt-0', className)} {...props}>
	<slot />
</div>
