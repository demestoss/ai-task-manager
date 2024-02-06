<script>
import { SignIn } from '@auth/sveltekit/components';
</script>

<div class="flex-col flex items-center space-x-3">
	<p class="scroll-m-20 text-xl font-semibold tracking-tight">Please Sign in</p>

  <SignIn provider="github"/>
</div>
