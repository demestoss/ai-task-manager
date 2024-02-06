// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
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

export {};
