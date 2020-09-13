import { RouterContext } from '../../deps.ts';
import { validateRequest, validateMongoId } from '../utils/validation.ts';
import {
  ITodo,
  ITodoUpdate,
  todoSchemaUpdate,
  todoSchema,
} from '../model/todoModel.ts';
import { MongoDatabaseRepository } from '../repository/MongoDatabaseRepository.ts';

const mongoDb = new MongoDatabaseRepository();

export const getAll = async (context: RouterContext) => {
  console.log('Getting all todos');
  try {
    const response = await mongoDb.findMany();
    const result = {
      success: true,
      length: response.length,
      data: response,
    };
    context.response.body = result;
  } catch (error) {
    const result = {
      success: false,
      length: 0,
      error: 'Request fail',
    };
  }
};

export const get = async (context: RouterContext) => {
  const id = context.params.id!;
  console.log(`Getting todo ${id}`);
  let result;
  try {
    validateMongoId(id);
    const response = await mongoDb.findOne(id);
    if (!response) {
      throw new Error('No todos found');
    }
    result = {
      success: true,
      data: response,
    };
  } catch (error) {
    result = {
      success: false,
      error: error.toString(),
    };
    if (error.message.includes('found')) {
      context.response.status = 404;
    } else {
      context.response.status = 500;
    }
  }
  context.response.body = result;
};

export const post = async (context: RouterContext) => {
  console.log('Adding a todo');
  const body = context.request.body();
  const data = <ITodo>await body.value;
  let response: Object;
  try {
    await validateRequest(data, todoSchema);
    const reqResponse = await mongoDb.insertOne(data);
    data['_id'] = reqResponse;
    response = {
      success: true,
      data,
    };
  } catch (error) {
    response = {
      success: false,
      error,
    };
  }
  context.response.body = response;
};

export const remove = async (context: RouterContext) => {
  const id = context.params.id!;
  console.log(`Removing todo ${id}`);
  let result;
  try {
    validateMongoId(id);
    const response = await mongoDb.deleteOne(id);
    if (!response) {
      throw new Error('No todos found to delete');
    }
    result = {
      success: true,
      data: response,
    };
  } catch (error) {
    result = {
      success: false,
      error: error.toString(),
    };
    if (error.message.includes('found')) {
      context.response.status = 404;
    } else {
      context.response.status = 500;
    }
  }
  context.response.body = result;
};
export const update = async (context: RouterContext) => {
  const id = context.params.id!;
  console.log(`Updating todo ${id}`);
  let result;
  try {
    validateMongoId(id);
    const body = context.request.body();
    let data: ITodoUpdate = await body.value;
    if (!data) {
      throw new Error('Empty body');
    }
    console.log(data);
    await validateRequest(data, todoSchemaUpdate);
    const response = await mongoDb.updateOne(id, data);
    result = {
      success: true,
      data: response,
    };
  } catch (error) {
    result = {
      success: false,
      error,
    };
    context.response.status = 500;
  }
  context.response.body = result;
};
