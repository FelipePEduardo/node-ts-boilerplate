import { CustomError } from '.';

export default class EntityNotFoundError extends CustomError {
  constructor(readonly entityName: string, readonly identifier: string | number) {
    super(`${entityName} not found (Identifier: ${identifier})`, 404);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
