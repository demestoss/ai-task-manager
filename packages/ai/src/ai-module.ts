import OpenAI from 'openai';

export class AiModule {
	private readonly #openai: OpenAI;

	constructor(secretKey: string) {
		this.#openai = new OpenAI();
	}
}