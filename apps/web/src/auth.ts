import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { getDatabaseClient, tableCreator } from '@repo/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { GITHUB_ID, GITHUB_SECRET, DATABASE_URL, DATABASE_AUTH_TOKEN, AUTH_SECRET } from '$env/static/private';

export type { Session } from '@auth/sveltekit';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const db = getDatabaseClient(
		event?.platform?.env?.DATABASE_URL ?? DATABASE_URL,
		event?.platform?.env?.DATABASE_AUTH_TOKEN ?? DATABASE_AUTH_TOKEN
	);

	const authOptions = {
		adapter: DrizzleAdapter(db, tableCreator),
		providers: [
			GitHub({
				clientId: event?.platform?.env?.GITHUB_ID ?? GITHUB_ID,
				clientSecret: event?.platform?.env?.GITHUB_SECRET ?? GITHUB_SECRET
			})
		],
		secret: event?.platform?.env?.AUTH_SECRET ?? AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
});
