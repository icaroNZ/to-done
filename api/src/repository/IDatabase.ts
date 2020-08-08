import { ITodo, ITodoUpdate } from '../model/todoModel.ts';
import { ObjectId, UpdateResult, WithID } from '../../deps.ts';

export interface IDatabase {
  findMany(): Promise<ITodo[]>;
  findOne(id: string): Promise<ITodo | null>;
  insertOne(todo: ITodo): Promise<ObjectId>;
  deleteOne(id: string): Promise<number>;
  updateOne(
    id: string,
    todoUpdate: ITodoUpdate
  ): Promise<UpdateResult & WithID>;
}
