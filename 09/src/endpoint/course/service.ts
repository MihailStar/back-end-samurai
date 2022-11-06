import type { SortDirection } from 'mongodb';
import { ObjectId } from 'mongodb';
import { getСollection } from '../../connection/database';
import type { Pagination } from '../../type/pagination';
import type { WithResultObject } from '../../type/result-object';
import type { WithoutId } from '../../type/without-id';
import { convertObjectId } from '../../utility/convert-object-id';
import type { Course, CreateCourseDTO, UpdateCourseDTO } from './type';

class CourseService {
  static async create(
    this: void,
    dto: CreateCourseDTO
  ): Promise<WithResultObject<Course>> {
    const { insertedId } = await getСollection<WithoutId<Course>>(
      'courses'
    ).insertOne(dto);
    const createdCourse = { _id: insertedId, ...dto };

    return {
      result: convertObjectId(createdCourse),
    };
  }

  /**
   * @todo Need implement filter option
   */
  static async readAll(
    this: void,
    {
      offset,
      limit,
      sort = {},
    }: Omit<Pagination, 'total'> & { sort?: Record<string, SortDirection> }
  ): Promise<WithResultObject<Course[]>> {
    const foundCourses = await getСollection<WithoutId<Course>>('courses')
      .find({})
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .toArray();

    return {
      result: foundCourses.map(convertObjectId),
    };
  }

  static async read(
    this: void,
    id: Course['id']
  ): Promise<WithResultObject<Course | null>> {
    const foundCourse = await getСollection<WithoutId<Course>>(
      'courses'
    ).findOne({
      _id: new ObjectId(id),
    });

    if (foundCourse === null) {
      return { result: null };
    }

    return {
      result: convertObjectId(foundCourse),
    };
  }

  static async update(
    this: void,
    id: Course['id'],
    dto: UpdateCourseDTO
  ): Promise<WithResultObject<Course | null>> {
    const { value: foundCourse } = await getСollection<WithoutId<Course>>(
      'courses'
    ).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: dto }
      /* { returnDocument: 'after' } */
    );

    if (foundCourse === null) {
      return { result: null };
    }

    const updatedCourse = { ...foundCourse, ...dto };

    return {
      result: convertObjectId(updatedCourse),
    };
  }

  static async delete(
    this: void,
    id: Course['id']
  ): Promise<WithResultObject<Course | null>> {
    const { value: deletedCourse } = await getСollection<WithoutId<Course>>(
      'courses'
    ).findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (deletedCourse === null) {
      return { result: null };
    }

    return {
      result: convertObjectId(deletedCourse),
    };
  }

  /**
   * @todo Need add filter param
   */
  static async count(this: void): Promise<WithResultObject<number>> {
    const amount = await getСollection<WithoutId<Course>>(
      'courses'
    ).countDocuments();

    return {
      result: amount,
    };
  }
}

export { CourseService };
