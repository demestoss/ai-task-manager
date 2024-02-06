import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { getDatabaseClient, tableCreator } from '@repo/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';

export type { Session } from '@auth/sveltekit';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	console.log(event);
	if (
		!event?.platform ||
		typeof event.platform !== 'object' ||
		(!('env' in event.platform) && !GITHUB_ID)
	) {
		throw new Error('Missing GITHUB_ID environment variable');
	}

	const db = getDatabaseClient(
		event.platform.env!.DATABASE_URL,
		event.platform.env!.DATABASE_AUTH_TOKEN
	);

	const authOptions = {
		adapter: DrizzleAdapter(db, tableCreator),
		providers: [
			GitHub({
				clientId: event.platform.env!.GITHUB_ID || GITHUB_ID,
				clientSecret: event.platform.env!.GITHUB_SECRET || GITHUB_SECRET
			})
		],
		secret: event.platform.env!.AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
});
