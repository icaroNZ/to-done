import { IDatabase } from "./IDatabase.ts";
import MongoDatabase from "../helper/mongodb.ts";
import { ITodo, ITodoUpdate } from "../model/todoModel.ts";
import { ObjectId, UpdateResult, WithID } from "../../deps.ts";

const mongoDbTodos = MongoDatabase.getInstance().getDatabase.collection<ITodo>(
  "todo",
);
const mongoDbTodoOrder = MongoDatabase.getInstance().getDatabase.collection(
  "orderTodo",
);

export class MongoDatabaseRepository implements IDatabase {
  async getTodoOrders() {
    return await mongoDbTodoOrder.aggregate([
      {
        "$project": {
          "results": {
            "$reduce": {
              "input": "$data",
              "initialValue": [],
              "in": {
                "collapsed": {
                  "$concatArrays": [
                    "$$value.collapsed",
                    "$$this",
                  ],
                },
                "firstValues": {
                  "$concatArrays": [
                    "$$value.firstValues",
                    {
                      "$slice": [
                        "$$this",
                        1,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        "$lookup": {
          "from": "todo",
          "localField": "results.collapsed._id",
          "foreignField": "_id",
          "as": "results.data",
        },
      },
      {
        "$project": {
          "results": {
            "collapsed": 0,
          },
        },
      },
    ]);
  }

  async updateTodoOrders(todoOrder: any) {
    mongoDbTodoOrder.deleteMany({});
    mongoDbTodoOrder.insertOne(todoOrder);
  }

  async findMany(): Promise<ITodo[]> {
    return await mongoDbTodos.find();
  }

  async findOne(id: string): Promise<ITodo | null> {
    return await mongoDbTodos.findOne({ _id: { $oid: id } });
  }

  async insertOne(todo: ITodo): Promise<ObjectId> {
    return await mongoDbTodos.insertOne(todo);
  }

  async deleteOne(id: string): Promise<number> {
    return await mongoDbTodos.deleteOne({ _id: { $oid: id } });
  }

  async updateOne(
    id: string,
    todoUpdate: ITodoUpdate,
  ): Promise<UpdateResult & WithID> {
    return await mongoDbTodos.updateOne(
      { _id: { $oid: id } },
      { $set: todoUpdate },
    );
  }
}
