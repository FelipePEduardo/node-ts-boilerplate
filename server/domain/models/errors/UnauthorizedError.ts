import { CustomError } from '.';

export default class UnauthorizedError extends CustomError {
  constructor(message?: string) {
    super(message || 'Unauthorized', 401);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
