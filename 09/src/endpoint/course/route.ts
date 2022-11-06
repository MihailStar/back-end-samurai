import cors from 'cors';
import { json, Router } from 'express';
import { asyncMidddlewareErrorHandler } from '../../middleware/async-midddleware-error-handler';
import { CourseController } from './controller';

const courseRoute = Router();

courseRoute.use(cors()).use(json());

courseRoute
  .route('/')
  .post(asyncMidddlewareErrorHandler(CourseController.create))
  .get(asyncMidddlewareErrorHandler(CourseController.readAll));

courseRoute
  .route('/:courseId')
  .get(asyncMidddlewareErrorHandler(CourseController.read))
  .put(asyncMidddlewareErrorHandler(CourseController.update))
  .delete(asyncMidddlewareErrorHandler(CourseController.delete));

export { courseRoute };
