import type { NextFunction, Request, Response } from 'express';

/**
 * Wraps asynch middleware with try-catch
 */
function asyncMidddlewareErrorHandler<
  Params = import('express-serve-static-core').ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = import('express-serve-static-core').Query,
  Locals extends Record<string, unknown> = Record<string, unknown>
>(
  asyncMidddleware: (
    req: Request<Params, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ) => Promise<void>
): (
  req: Request<Params, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => Promise<void> {
  return async function asyncMiddlewareWithErrorHandler(
    req: Request<Params, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): Promise<void> {
    try {
      await asyncMidddleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export { asyncMidddlewareErrorHandler };
