import { SvelteKitAuth } from '@auth/sveltekit';
import { getAuthOptions } from '@repo/auth';
import * as $env from '$env/static/private';

export type { Session } from '@repo/auth';

// @ts-ignore
export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const env = event?.platform?.env ?? { ...$env };

	return getAuthOptions(env);
});
