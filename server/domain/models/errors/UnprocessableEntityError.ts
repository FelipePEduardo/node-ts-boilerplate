import { CustomError } from '.';

export default class UnprocessableEntityError extends CustomError {
  constructor(message?: string) {
    super(message || 'Unprocessable Entity', 422);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
