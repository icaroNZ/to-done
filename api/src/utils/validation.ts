import {
  validate,
  firstMessages,
  ObjectId,
  ValidationRules,
} from '../../deps.ts';

export const validateRequest = async (obj: Object, schema: ValidationRules) => {
  const [passes, errors] = await validate(obj, schema);
  if (!passes) {
    throw firstMessages(errors);
  }
  return true;
};

export const validateMongoId = (id: string) => {
  ObjectId(id);
};
