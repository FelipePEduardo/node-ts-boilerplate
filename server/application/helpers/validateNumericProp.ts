import { ValidationError } from "@domain/models";

export default function validateNumericProp(value: unknown, prop: string): number {
  const valueAsNumber = Number(value);

  if (!Number.isSafeInteger(valueAsNumber) || valueAsNumber < 1) throw new ValidationError([prop]);

  return valueAsNumber;
}
