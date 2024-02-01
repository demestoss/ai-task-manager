<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { buttonVariants, type Props } from '.';

	let { variant = 'default', size = 'default', ...props } = $props<Props>();
</script>

<ButtonPrimitive.Root
	{...props}
	class={cn(buttonVariants({ variant, size, className: props.class }))}
>
	<slot />
</ButtonPrimitive.Root>
