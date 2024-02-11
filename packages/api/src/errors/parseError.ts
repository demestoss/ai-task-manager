import { DataError } from './DataError';
import { HTTPException } from 'hono/http-exception';

export function parseError(error: Error): [string, number] {
  if (error instanceof HTTPException) {
    return [error.message, error.status];
  }

  if (error instanceof DataError) {
    switch (error.type) {
      case 'not-found':
        return [`Not Found: ${error.message}`, 404];
      case 'creating-failed':
        return [`Creating failed: ${error.message}`, 500];
    }
  }

  return [error.message, 500];
}
