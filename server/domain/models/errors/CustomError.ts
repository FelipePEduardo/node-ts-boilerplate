export default class CustomError extends Error {
  readonly httpStatus: number;
  constructor(readonly message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
