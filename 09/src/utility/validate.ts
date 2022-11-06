import type { HttpError } from 'http-errors';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import type { ObjectSchema } from 'joi';
import { ValidationError } from 'joi';

function validate<S>(object: object, scheme: ObjectSchema<S>): HttpError | S {
  const { error, value } = scheme.validate(object);

  if (error instanceof ValidationError) {
    return createError(StatusCodes.BAD_REQUEST, error.message);
  }

  return value as NonNullable<S>;
}

export { validate };
