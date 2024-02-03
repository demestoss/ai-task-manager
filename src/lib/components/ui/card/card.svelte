<script lang="ts">
	import { clsx } from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...props } = $props<Props>();
</script>

<div
	{...props}
	class={clsx('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)}
>
	<slot />
</div>
