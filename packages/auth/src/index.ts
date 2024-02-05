import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { getDatabaseClient, tableCreator } from '@repo/db'
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export type { Session } from "@auth/sveltekit"

declare module '@sveltejs/kit' {
    namespace App {
        interface Platform {
            env: {
                GITHUB_ID: string;
                GITHUB_SECRET: string;
                DATABASE_URL: string;
                DATABASE_AUTH_TOKEN: string;
                AUTH_SECRET: string;
            };
        }
    }
}

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    if (!event?.platform || typeof event.platform !== 'object' || !("env" in event.platform)) {
        throw new Error('Missing GITHUB_ID environment variable');
    }

    const db = getDatabaseClient(event.platform.env!.DATABASE_URL, event.platform.env!.DATABASE_AUTH_TOKEN);

    const authOptions = {
        adapter: DrizzleAdapter(db, tableCreator),
        providers: [GitHub({ clientId: event.platform.env!.GITHUB_ID, clientSecret: event.platform.env!.GITHUB_SECRET })],
        secret: event.platform.env!.AUTH_SECRET,
        trustHost: true
    }
    return authOptions
});
