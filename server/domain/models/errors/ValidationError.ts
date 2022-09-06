import { CustomError } from '.';

export default class ValidationError extends CustomError {
  constructor(fields: string[]) {
    super(`Fields are not valid: [${fields.join(', ')}]`, 400);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
