import Joi from 'joi';
import { ObjectId } from 'mongodb';
import type { CreateCourseDTO, UpdateCourseDTO } from './type';

const createCourseScheme = Joi.object<CreateCourseDTO>({
  title: Joi.string().min(3).required(),
});

const updateCourseScheme = Joi.object<UpdateCourseDTO>({
  title: Joi.string().min(3),
});

const courseIdScheme = Joi.object<{ courseId: string }>({
  courseId: Joi.string()
    .custom((courseId: string, helpers) =>
      ObjectId.isValid(courseId) ? courseId : helpers.error('any.invalid')
    )
    .required(),
});

export { createCourseScheme, updateCourseScheme, courseIdScheme };
