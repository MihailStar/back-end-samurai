import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

function handleUnregisteredRoute(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(createError(StatusCodes.NOT_FOUND, 'Route not found'));
}

export { handleUnregisteredRoute };
