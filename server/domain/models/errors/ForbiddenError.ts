import { CustomError } from '.';

export default class ForbiddenError extends CustomError {
  constructor(readonly message: string) {
    super(message, 403);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
