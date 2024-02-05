import type { Actions } from '@sveltejs/kit';
import { makeClient } from '$lib/make-client';
import { TaskCreateInput } from '@repo/api';

export const actions = {
	async default({ fetch, request }) {
		const client = makeClient(fetch);
		const form = await request.formData();
		const data = TaskCreateInput.parse(Object.fromEntries(form));
		const response = await client.api.v1.tasks.$post({
			json: data
		});

		if (!response.ok) {
			return { message: await response.text() };
		}

		return await response.json();
	}
} satisfies Actions;
