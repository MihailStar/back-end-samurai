import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
// eslint-disable-next-line node/no-unpublished-import
import supertest from 'supertest';
import { createApp } from '../app';
import { connectDatabase, disconnectDatabase } from '../connection/database';
import type {
  Course,
  CreateCourseDTO,
  UpdateCourseDTO,
} from '../resource/course/type';
import type { WithDataObject } from '../type/with-data-object';

const app = createApp();
const request = supertest(app);

let testСourse: Course;
const nonExistCourseId: Course['id'] = '62e0414a0fb9ab3416827c89';

type BodyWithData<D extends object | null> = D extends object
  ? { body: WithDataObject<D> }
  : { body: { data: null } };
type BodyWithReason<R extends string = 'Course not found'> = {
  body: { reason: R };
};

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('Create', () => {
  test('returns Course', async () => {
    const dto: CreateCourseDTO = { title: 'created title' };
    const response = await request.post('/course').send(dto);
    const { body } = response as BodyWithData<Course>;

    expect(response.status).toBe(StatusCodes.CREATED);

    expect(ObjectId.isValid(body.data.id)).toBe(true);
    expect(body.data.title).toBe(dto.title);

    testСourse = body.data;
  });
});

describe('Read All', () => {
  test('returns Course[]', async () => {
    const response = await request.get('/course').send();
    const { body } = response as BodyWithData<Course[]>;

    expect(response.status).toBe(StatusCodes.OK);

    expect(Array.isArray(body.data)).toBe(true);
  });
});

describe('Read', () => {
  test('returns reason', async () => {
    const response = await request.get(`/course/${nonExistCourseId}`).send();
    const { body } = response as BodyWithReason;

    expect(response.status).toBe(StatusCodes.NOT_FOUND);

    /* expect(typeof body.reason).toBe('string'); */
    expect(body.reason).toBe('Course not found');
  });

  test('returns Course', async () => {
    const response = await request.get(`/course/${testСourse.id}`).send();
    const { body } = response as BodyWithData<Course>;

    expect(response.status).toBe(StatusCodes.OK);

    expect(body.data.id).toBe(testСourse.id);
    expect(body.data.title).toBe(testСourse.title);
  });
});

describe('Update', () => {
  test('returns reason', async () => {
    const dto: UpdateCourseDTO = { title: 'updated title' };
    const response = await request
      .patch(`/course/${nonExistCourseId}`)
      .send(dto);
    const { body } = response as BodyWithReason;

    expect(response.status).toBe(StatusCodes.NOT_FOUND);

    /* expect(typeof body.reason).toBe('string'); */
    expect(body.reason).toBe('Course not found');
  });

  test('returns Course', async () => {
    const dto: UpdateCourseDTO = { title: 'updated title' };
    const response = await request.patch(`/course/${testСourse.id}`).send(dto);
    const { body } = response as BodyWithData<Course>;

    expect(response.status).toBe(StatusCodes.OK);

    expect(body.data.id).toBe(testСourse.id);
    expect(body.data.title).toBe(dto.title);

    testСourse = body.data;
  });
});

describe('Delete', () => {
  test('returns reason', async () => {
    const response = await request.delete(`/course/${nonExistCourseId}`).send();
    const { body } = response as BodyWithReason;

    expect(response.status).toBe(StatusCodes.NOT_FOUND);

    /* expect(typeof body.reason).toBe('string'); */
    expect(body.reason).toBe('Course not found');
  });

  test('returns Course', async () => {
    const response = await request.delete(`/course/${testСourse.id}`).send();
    const { body } = response as BodyWithData<Course>;

    expect(response.status).toBe(StatusCodes.OK);

    expect(body.data.id).toBe(testСourse.id);
    expect(body.data.title).toBe(testСourse.title);
  });

  test('returns reason', async () => {
    const response = await request.delete(`/course/${testСourse.id}`).send();
    const { body } = response as BodyWithReason;

    expect(response.status).toBe(StatusCodes.NOT_FOUND);

    /* expect(typeof body.reason).toBe('string'); */
    expect(body.reason).toBe('Course not found');
  });
});
