<script>
	import { clsx } from 'clsx';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<header class="flex justify-between items-center">
	<h1
		class="scroll-m-20 mb-4 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		AITM: Task manager powered by AI
	</h1>

	<nav>
		<ul class="flex space-x-5">
			<li>
				<a
					class={clsx(
						'text-foreground/60 hover:text-foreground/80',
						$page.url.pathname === '/tasks' && 'text-foreground/90'
					)}
					data-sveltekit-preload-data="tap"
					href="/tasks"
				>
					Home
				</a>
			</li>
			<li>
				<a
					class={clsx(
						'text-foreground/60 hover:text-foreground/80',
						$page.url.pathname === '/tasks/finished' && 'text-foreground/90'
					)}
					data-sveltekit-preload-data="tap"
					href="/tasks/finished"
				>
					Finished Tasks
				</a>
			</li>

			<li>
				<button
					type="button"
					onclick={() => signOut({ callbackUrl: '/login' })}
					class={'text-foreground/60 hover:text-foreground/80'}
				>
					Sign Out
				</button>
			</li>
		</ul>
	</nav>
</header>

<main class="pt-10">
	<slot />
</main>
