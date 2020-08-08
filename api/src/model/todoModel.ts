import {
  lengthBetween,
  required,
  isBool,
  isString,
  isDate,
  nullable,
  notNull,
} from '../../deps.ts';

import { optionalLengthBetween } from './Rules/OptionalLengthBetween.ts';

export interface ITodo {
  name: string;
  title: string;
  description?: string;
  done: boolean;
  color?: string;
  end_at?: Date;
  created_at: Date;
  updated_at?: Date;
}

export const todoSchema = {
  name: [notNull, lengthBetween(5, 100), isString, required],
  title: [notNull, lengthBetween(5, 100), isString, required],
  description: [isString, nullable],
  done: [isBool, required],
  color: [isString, nullable],
  end_at: [isDate, nullable],
  created_at: [isDate, required],
  updated_at: [isDate, nullable],
};

export interface ITodoUpdate {
  name?: string;
  title?: string;
  description?: string;
  done?: boolean;
  color?: string;
  end_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export const todoSchemaUpdate = {
  name: [notNull, optionalLengthBetween(5, 100)],
  title: [notNull, optionalLengthBetween(5, 100)],
  description: [isString, nullable],
  done: [notNull, isBool],
  color: [isString, nullable],
  end_at: [isDate, nullable],
  created_at: [isDate],
  updated_at: [isDate, nullable],
};
