# Tasks Manager powered by AI

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-svelte
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `server`: a Cloudflare worker app for standalone API
- `web`: main [svelte-kit](https://kit.svelte.dev/) app
- `api`: Hono API router to use in Web app and in standalone
- `auth`: Auth js wrapper, that provides utilities to work with auth
- `db`: DB Adapter with migrations
- `eslint-config-custom`: `eslint` configurations (includes `eslint-plugin-svelte` and `eslint-config-prettier`)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
