export type DataErrorType = 'not-found' | 'creating-failed';

export class DataError extends Error {
  constructor(
    public readonly type: DataErrorType,
    message?: string
  ) {
    super(message);
  }
}
