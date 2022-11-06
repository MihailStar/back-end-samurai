import type { ServerResponse } from 'http';
import httpStatus from 'http-status';
import { ErrorObject, stringifyObject } from './stringify-object';

function handleError(error: unknown, response: ServerResponse): void {
  const errorObject: ErrorObject = {
    reason: String(error),
  };

  response.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  response.setHeader('Content-Type', 'application/json');
  response.write(stringifyObject(errorObject));
  response.end();
}

export { handleError };
