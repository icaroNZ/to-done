import { IDatabase } from './IDatabase.ts';
import MongoDatabase from '../helper/mongodb.ts';
import { ITodo, ITodoUpdate } from '../model/todoModel.ts';
import { ObjectId, UpdateResult, WithID } from '../../deps.ts';

const mongoDb = MongoDatabase.getInstance().getDatabase.collection<ITodo>(
  'todo'
);

export class MongoDatabaseRepository implements IDatabase {
  async findMany(): Promise<ITodo[]> {
    return await mongoDb.find();
  }

  async findOne(id: string): Promise<ITodo | null> {
    return await mongoDb.findOne({ _id: { $oid: id } });
  }

  async insertOne(todo: ITodo): Promise<ObjectId> {
    return await mongoDb.insertOne(todo);
  }

  async deleteOne(id: string): Promise<number> {
    return await mongoDb.deleteOne({ _id: { $oid: id } });
  }

  async updateOne(
    id: string,
    todoUpdate: ITodoUpdate
  ): Promise<UpdateResult & WithID> {
    return await mongoDb.updateOne({ _id: { $oid: id } }, { $set: todoUpdate });
  }
}
