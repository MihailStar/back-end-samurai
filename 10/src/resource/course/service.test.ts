import { ObjectId } from 'mongodb';
import { connectDatabase, disconnectDatabase } from '../../connection/database';
import type { WithResultObject } from '../../type/with-result-object';
import { CourseService } from './service';
import type { Course, CreateCourseDTO, UpdateCourseDTO } from './type';

let testСourse: Course;
const nonExistCourseId: Course['id'] = '62e0414a0fb9ab3416827c89';

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('CourseService.create', () => {
  const method = 'create';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns Course', async () => {
    const dto: CreateCourseDTO = { title: 'created title' };
    const { result: createdCourse } = await CourseService[method](dto);

    expect(ObjectId.isValid(createdCourse.id)).toBe(true);
    expect(createdCourse.title).toBe(dto.title);

    testСourse = createdCourse;
  });
});

describe('CourseService.readAll', () => {
  const method = 'readAll';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns Course[]', async () => {
    const { result: readedCourses } = await CourseService[method]({
      offset: 0,
      limit: 5,
      sort: {},
    });

    expect(Array.isArray(readedCourses)).toBe(true);
  });
});

describe('CourseService.read', () => {
  const method = 'read';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns null', async () => {
    const { result: zero } = await CourseService[method](nonExistCourseId);

    expect(zero).toBe(null);
  });

  test('returns Course', async () => {
    const { result: readedCourse } = (await CourseService[method](
      testСourse.id
    )) as WithResultObject<Course>;

    expect(readedCourse.id).toBe(testСourse.id);
    expect(readedCourse.title).toBe(testСourse.title);
  });
});

describe('CourseService.update', () => {
  const method = 'update';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns null', async () => {
    const dto: UpdateCourseDTO = { title: 'updated title' };
    const { result: zero } = await CourseService[method](nonExistCourseId, dto);

    expect(zero).toBe(null);
  });

  test('returns Course', async () => {
    const dto: UpdateCourseDTO = { title: 'updated title' };
    const { result: updatedCourse } = (await CourseService[method](
      testСourse.id,
      dto
    )) as WithResultObject<Course>;

    expect(updatedCourse.id).toBe(testСourse.id);
    expect(updatedCourse.title).toBe(dto.title);

    testСourse = updatedCourse;
  });
});

describe('CourseService.delete', () => {
  const method = 'delete';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns null', async () => {
    const { result: zero } = await CourseService[method](nonExistCourseId);

    expect(zero).toBe(null);
  });

  test('returns Course', async () => {
    const { result: deletedCourse } = (await CourseService[method](
      testСourse.id
    )) as WithResultObject<Course>;

    expect(deletedCourse.id).toBe(testСourse.id);
    expect(deletedCourse.title).toBe(testСourse.title);
  });

  test('returns null', async () => {
    const { result: zero } = await CourseService[method](testСourse.id);

    expect(zero).toBe(null);
  });
});

describe('CourseService.count', () => {
  const method = 'count';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns number', async () => {
    const { result: total } = await CourseService[method]();

    expect(typeof total).toBe('number');
  });
});
