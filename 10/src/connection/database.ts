import type { Collection, Db, Document } from 'mongodb';
import { MongoClient } from 'mongodb';
import { configuration } from '../common/configuration';

const { DATABASE_URL, DATABASE_NAME } = configuration;

const mongoClient = new MongoClient(DATABASE_URL);

let DATABASE: Db | null = null;
async function connectDatabase(): Promise<Db> {
  if (DATABASE === null) {
    await mongoClient.connect();

    DATABASE = mongoClient.db(DATABASE_NAME);

    return DATABASE;
  }

  return DATABASE;
}

async function disconnectDatabase(): Promise<void> {
  await mongoClient.close();
}

/**
 * @throws {Error} Throws exception when no connection to database
 */
function getСollection<T = Document>(name: string): Collection<T> {
  if (DATABASE === null) {
    throw new Error('No database connection');
  }

  return DATABASE.collection<T>(name);
}

/**
 * @throws {Error} Throws exception when no connection to database
 */
async function dropСollection(name: string): Promise<void> {
  if (DATABASE === null) {
    throw new Error('No database connection');
  }

  await DATABASE.dropCollection(name);
}

export { connectDatabase, disconnectDatabase, getСollection, dropСollection };
