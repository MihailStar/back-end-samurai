import type { ObjectId } from 'mongodb';

function convertObjectId<O extends { _id: ObjectId }>({
  _id,
  ...object
}: O): { id: string } & Omit<O, '_id'> {
  return { id: _id.toString(), ...object };
}

export { convertObjectId };
