import type { WithId } from '../../type/with-id';

type BaseCourse = { title: string };

type CreateCourseDTO = Required<BaseCourse>;

type UpdateCourseDTO = Partial<BaseCourse>;

type Course = WithId<BaseCourse>;

export { CreateCourseDTO, UpdateCourseDTO, Course };
