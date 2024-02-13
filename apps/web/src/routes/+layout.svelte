<script>
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
</script>

<Toaster closeButton />
<ModeWatcher defaultMode="light" />

<div class="container min-h-screen flex flex-col">
	<slot />
</div>
