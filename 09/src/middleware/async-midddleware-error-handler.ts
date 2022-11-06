import type { NextFunction, Request, Response } from 'express';

/**
 * Wraps asynch middleware with try-catch
 * @tutorial https://github.com/abazhenov/express-async-handler/blob/master/index.d.ts
 */
function asyncMidddlewareErrorHandler<
  Params = import('express-serve-static-core').ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = import('express-serve-static-core').Query,
  Locals extends Record<string, any> = Record<string, any>
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
