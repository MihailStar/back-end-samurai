import { configuration } from '../../common/configuration';
import {
  connectDatabase,
  disconnectDatabase,
  dropDatabase,
} from '../../connection/database';
import type { WithResultObject } from '../../type/result-object';
import { CourseService } from './service';
import type { Course, CreateCourseDTO, UpdateCourseDTO } from './type';

const { DATABASE_NAME } = configuration;

let initialNumberOfCourses: number;
let initialCourseId: Course['id'];
const nonExistId: Course['id'] = '62e0414a0fb9ab3416827c89';

beforeAll(async () => {
  await connectDatabase(`${DATABASE_NAME}-for-service-test`);
});

afterAll(async () => {
  await dropDatabase();
  await disconnectDatabase();
});

describe('CourseService.count', () => {
  const method = 'count';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns number', async () => {
    const { result: amount } = await CourseService[method]();

    expect(typeof amount).toBe('number');

    initialNumberOfCourses = amount;
  });
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

    expect(typeof createdCourse.id).toBe('string');
    expect(createdCourse.title).toBe(dto.title);

    expect((await CourseService.count()).result).toBe(
      initialNumberOfCourses + 1
    );

    initialCourseId = createdCourse.id;
  });
});

describe('CourseService.readAll', () => {
  const method = 'readAll';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns Course[]', async () => {
    const { result: foundCourses } = await CourseService[method]({
      offset: 0,
      limit: 5,
      sort: {},
    });

    expect(Array.isArray(foundCourses)).toBe(true);
  });
});

describe('CourseService.read', () => {
  const method = 'read';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns null', async () => {
    const { result: zero } = await CourseService[method](nonExistId);

    expect(zero).toBe(null);
  });

  test('returns Course', async () => {
    const { result: foundCourse } = (await CourseService[method](
      initialCourseId
    )) as WithResultObject<Course>;

    expect(foundCourse.id).toBe(initialCourseId);
    expect(typeof foundCourse.title).toBe('string');
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
    const { result: zero } = await CourseService[method](nonExistId, dto);

    expect(zero).toBe(null);
  });

  test('returns Course', async () => {
    const dto: UpdateCourseDTO = { title: 'updated title' };
    const { result: updatedCourse } = (await CourseService[method](
      initialCourseId,
      dto
    )) as WithResultObject<Course>;

    expect(updatedCourse.id).toBe(initialCourseId);
    expect(updatedCourse.title).toBe(dto.title);
  });
});

describe('CourseService.delete', () => {
  const method = 'delete';

  test('exists', () => {
    expect(CourseService[method]).toBeDefined();
    expect(typeof CourseService[method]).toBe('function');
  });

  test('returns null', async () => {
    const { result: zero } = await CourseService[method](nonExistId);

    expect(zero).toBe(null);

    expect((await CourseService.count()).result).toBe(
      initialNumberOfCourses + 1
    );
  });

  test('returns Course', async () => {
    const { result: deletedCourse } = (await CourseService[method](
      initialCourseId
    )) as WithResultObject<Course>;

    expect(deletedCourse.id).toBe(initialCourseId);
    expect(typeof deletedCourse.title).toBe('string');

    expect((await CourseService.count()).result).toBe(initialNumberOfCourses);
  });
});
