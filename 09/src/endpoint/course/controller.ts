import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import type { WithDataObject } from '../../type/data-object';
import type { Pagination } from '../../type/pagination';
import { validate } from '../../utility/validate';
import {
  courseIdScheme,
  createCourseScheme,
  updateCourseScheme,
} from './schema';
import { CourseService } from './service';
import type { Course, CreateCourseDTO, UpdateCourseDTO } from './type';

class CourseController {
  static async create(
    this: void,
    req: Request<unknown, unknown, CreateCourseDTO, unknown>,
    res: Response<WithDataObject<Course>>,
    next: NextFunction
  ): Promise<void> {
    const validatedBodyOrHttpError = validate(req.body, createCourseScheme);
    if (validatedBodyOrHttpError instanceof Error) {
      next(validatedBodyOrHttpError);
      return;
    }

    const createCourseDto = validatedBodyOrHttpError;
    const { result: createdCourse } = await CourseService.create(
      createCourseDto
    );

    res.status(StatusCodes.CREATED).json({ data: createdCourse });
  }

  /**
   * @todo Need implement filter
   */
  static async readAll(
    this: void,
    req: Request<
      unknown,
      unknown,
      unknown,
      { offset?: string; limit?: string; sort?: Record<string, 'asc' | 'desc'> }
    >,
    res: Response<WithDataObject<Course[]> & Pagination>
  ): Promise<void> {
    const {
      offset: queryOffset = '0',
      limit: queryLimit = '5',
      sort = {},
    } = req.query;
    const offset = Number.parseInt(queryOffset, 10);
    const limit = Number.parseInt(queryLimit, 10);
    const { id, ...restSortParams } = sort;

    const { result: foundCourses } = await CourseService.readAll({
      offset,
      limit,
      sort:
        typeof id === 'string'
          ? { _id: id, ...restSortParams }
          : restSortParams,
    });
    const { result: total } = await CourseService.count();

    res
      .status(StatusCodes.OK)
      .json({ data: foundCourses, offset, limit, total });
  }

  static async read(
    this: void,
    req: Request<{ courseId: string }, unknown, unknown, unknown>,
    res: Response<WithDataObject<Course>>,
    next: NextFunction
  ): Promise<void> {
    const validatedParamsOrHttpError = validate(req.params, courseIdScheme);
    if (validatedParamsOrHttpError instanceof Error) {
      next(validatedParamsOrHttpError);
      return;
    }

    const { courseId } = validatedParamsOrHttpError;
    const { result: foundCourse } = await CourseService.read(courseId);

    if (foundCourse === null) {
      next(createError(StatusCodes.NOT_FOUND, 'Course not found'));
      return;
    }

    res.status(StatusCodes.OK).json({ data: foundCourse });
  }

  static async update(
    this: void,
    req: Request<{ courseId: string }, unknown, UpdateCourseDTO, unknown>,
    res: Response<WithDataObject<Course>>,
    next: NextFunction
  ): Promise<void> {
    const validatedParamsOrHttpError = validate(req.params, courseIdScheme);
    if (validatedParamsOrHttpError instanceof Error) {
      next(validatedParamsOrHttpError);
      return;
    }

    const validatedBodyOrHttpError = validate(req.body, updateCourseScheme);
    if (validatedBodyOrHttpError instanceof Error) {
      next(validatedBodyOrHttpError);
      return;
    }

    const { courseId } = validatedParamsOrHttpError;
    const updateCourseDto = validatedBodyOrHttpError;
    const { result: updatedCourse } = await CourseService.update(
      courseId,
      updateCourseDto
    );

    if (updatedCourse === null) {
      next(createError(StatusCodes.NOT_FOUND, 'Course not found'));
      return;
    }

    /* res.status(StatusCodes.NO_CONTENT); */
    res.status(StatusCodes.OK).json({ data: updatedCourse });
  }

  static async delete(
    this: void,
    req: Request<{ courseId: string }, unknown, unknown, unknown>,
    res: Response<WithDataObject<Course>>,
    next: NextFunction
  ): Promise<void> {
    const validatedParamsOrHttpError = validate(req.params, courseIdScheme);
    if (validatedParamsOrHttpError instanceof Error) {
      next(validatedParamsOrHttpError);
      return;
    }

    const { courseId } = validatedParamsOrHttpError;
    const { result: deletedCourse } = await CourseService.delete(courseId);

    if (deletedCourse === null) {
      next(createError(StatusCodes.NOT_FOUND, 'Course not found'));
      return;
    }

    /* res.status(StatusCodes.NO_CONTENT); */
    res.status(StatusCodes.OK).json({ data: deletedCourse });
  }
}

export { CourseController };
