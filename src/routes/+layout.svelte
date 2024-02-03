<script>
	import '../app.pcss';
	import { clsx } from 'clsx';
	import { page } from '$app/stores';
</script>

<div class="container">
	<header class="flex">
		<h1
			class="scroll-m-20 mb-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			AITM: Task manager powered by AI
		</h1>

		<nav>
			<ul>
				<li>
					<a
						class={clsx('text-foreground/60 hover:text-foreground/80', $page.url.pathname === '/')}
						href="/"
					>
						Home
					</a>
				</li>
				<li>
					<a
						class={clsx(
							'text-foreground/60 hover:text-foreground/80',
							$page.url.pathname === '/finished'
						)}
						href="/finished"
					>
						Finished Tasks
					</a>
				</li>
			</ul>
		</nav>
	</header>

	<main>
		<slot />
	</main>
</div>
