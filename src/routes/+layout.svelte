<script>
	import '../app.pcss';
	import { clsx } from 'clsx';
	import { page } from '$app/stores';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />

<div class="container">
	<header class="flex justify-between items-center">
		<nav>
			<ul class="flex space-x-5">
				<li>
					<a
						class={clsx(
							'text-foreground/60 hover:text-foreground/80',
							$page.url.pathname === '/' && 'text-foreground/90'
						)}
						href="/"
					>
						Home
					</a>
				</li>
				<li>
					<a
						class={clsx(
							'text-foreground/60 hover:text-foreground/80',
							$page.url.pathname === '/finished' && 'text-foreground/90'
						)}
						href="/finished"
					>
						Finished Tasks
					</a>
				</li>
			</ul>
		</nav>

		<h1
			class="scroll-m-20 mb-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			AITM: Task manager powered by AI
		</h1>
	</header>

	<main class="pt-10">
		<slot />
	</main>
</div>
