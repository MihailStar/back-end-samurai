import type { Collection, SortDirection } from 'mongodb';
import { ObjectId } from 'mongodb';
import { getСollection } from '../../connection/database';
import type { Pagination } from '../../type/pagination';
import type { WithResultObject } from '../../type/with-result-object';
import type { WithoutId } from '../../type/without-id';
import { convertObjectId } from '../../utility/convert-object-id';
import type { Course, CreateCourseDTO, UpdateCourseDTO } from './type';

class CourseService {
  static get collection(): Collection<WithoutId<Course>> {
    return getСollection<WithoutId<Course>>('course');
  }

  static async create(
    this: void,
    dto: CreateCourseDTO
  ): Promise<WithResultObject<Course>> {
    const { insertedId } = await CourseService.collection.insertOne(dto);
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
    const readedCourses = await CourseService.collection
      .find({})
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .toArray();

    return {
      result: readedCourses.map(convertObjectId),
    };
  }

  static async read(
    this: void,
    id: Course['id']
  ): Promise<WithResultObject<Course | null>> {
    const readedCourse = await CourseService.collection.findOne({
      _id: new ObjectId(id),
    });

    if (readedCourse === null) {
      return { result: null };
    }

    return {
      result: convertObjectId(readedCourse),
    };
  }

  static async update(
    this: void,
    id: Course['id'],
    dto: UpdateCourseDTO
  ): Promise<WithResultObject<Course | null>> {
    const { value: updatedCourse } =
      await CourseService.collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: dto },
        { returnDocument: 'after' }
      );

    if (updatedCourse === null) {
      return { result: null };
    }

    return {
      result: convertObjectId(updatedCourse),
    };
  }

  static async delete(
    this: void,
    id: Course['id']
  ): Promise<WithResultObject<Course | null>> {
    const { value: deletedCourse } =
      await CourseService.collection.findOneAndDelete({
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
    const total = await CourseService.collection.countDocuments();

    return {
      result: total,
    };
  }
}

export { CourseService };
