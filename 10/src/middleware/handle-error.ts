import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { WithErrorObject } from '../type/with-error-object';

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
  const reason = createError.isHttpError(error)
    ? error.message
    : ReasonPhrases.INTERNAL_SERVER_ERROR;

  res.status(status).json({ reason });
}

export { handleError };
