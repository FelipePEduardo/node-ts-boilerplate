declare global {
  declare module 'express' {
    export interface Request {
      query: import('@domain/DTO/QueryParams').QueryParams;
    }
  }

  declare module 'express-serve-static-core' {
    export interface Request {
      query: import('@domain/DTO/QueryParams').QueryParams;
    }
  }
}
