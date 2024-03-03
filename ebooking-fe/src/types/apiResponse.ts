export type ApiResponse<T> = {
  statusCode: string;
  statusMessage: string;
  response: T;
};
