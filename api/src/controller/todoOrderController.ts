import { RouterContext } from "../../deps.ts";
import { validateRequest, validateMongoId } from "../utils/validation.ts";

import { MongoDatabaseRepository } from "../repository/MongoDatabaseRepository.ts";

const mongoDb = new MongoDatabaseRepository();

export const getOrder = async (context: RouterContext) => {
  console.log("Getting order for todos");
  try {
    const response: any = await mongoDb.getTodoOrders();
    const result = {
      success: true,
      numberOfGroups: response[0].results.firstValues.length,
      numberOfTodos: response[0].results.data.length,
      data: response[0].results,
    };
    context.response.body = result;
  } catch (error) {
    const result = {
      success: false,
      length: 0,
      error: "Request fail",
    };
  }
};

export const updateOrder = async (context: RouterContext) => {
  console.log("Updating order for todo");
  let result;
  try {
    const body = context.request.body();
    let data = await body.value;
    if (!data) {
      throw new Error("Empty body");
    }
    console.log(data);
    //await validateRequest(data, todoSchemaUpdate);
    const response = await mongoDb.updateTodoOrders(data);
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
