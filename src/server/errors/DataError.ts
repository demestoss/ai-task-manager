export type DataErrorType = 'not-found'

export class DataError extends Error {
	constructor(public readonly type: DataErrorType, message?: string) {
		super(message);
	}
}