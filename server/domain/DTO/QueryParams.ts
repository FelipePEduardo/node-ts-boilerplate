type PaginationOptions = { start?: string; limit?: string; sort?: string };

export type QueryParams = { [key: string]: unknown } & PaginationOptions;
