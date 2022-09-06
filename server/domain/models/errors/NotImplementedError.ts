import { CustomError } from '.';

export default class NotImplementedError extends CustomError {
  constructor(message?: string) {
    super(message || 'Not Implement', 501);
  }
}
