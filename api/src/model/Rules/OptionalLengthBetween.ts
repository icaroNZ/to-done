import { Validity, invalid, Rule } from '../../../deps.ts';

export function optionalLengthBetween(
  minLength: number,
  maxLength: number
): Rule {
  return function optionalLengthRule(value: any): Validity {
    if (value === null) {
      return invalid('lengthBetween', { value, minLength, maxLength }, false);
    }
    if (value.length < minLength || value.length > maxLength) {
      return invalid('lengthBetween', { value, minLength, maxLength }, false);
    }
  };
}
