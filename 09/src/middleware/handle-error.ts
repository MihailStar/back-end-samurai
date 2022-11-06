import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { configuration } from '../common/configuration';
import type { WithErrorObject } from '../type/error-object';

const { isDevelopment } = configuration;

function handleError(
  error: Error,
  _req: Request,
  res: Response<WithErrorObject<Error>>,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(error);
    return;
  }

  const status = createError.isHttpError(error)
    ? error.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const reason = isDevelopment
    ? error.message
    : ReasonPhrases.INTERNAL_SERVER_ERROR;
  /**
   * Standard Error not serializing, me sad
   * `JSON.stringify(new Error('Some error')); // -> '{}'`
   */
  const errorObject = isDevelopment ? { error } : {};

  res.status(status).json({ reason, ...errorObject });
}

export { handleError };
