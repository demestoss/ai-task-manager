<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { buttonVariants, type Props, type Events } from '.';

	type $$Events = Events;

	let { variant = 'default', size = 'default', ...props } = $props<Props>();

	let className: Props['class'] = undefined;
	export { className as class };
</script>

<ButtonPrimitive.Root class={cn(buttonVariants({ variant, size, className }))} {...props}>
	<slot />
</ButtonPrimitive.Root>
