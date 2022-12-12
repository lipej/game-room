export type ResponseData<K> = {
  success: true;
  code: number;
  data?: K;
};

export type ResponseError = {
  success: false;
  code: number;
  error?: {
    message: string;
  };
};

export type Response<K = undefined> = ResponseData<K> | ResponseError;

export abstract class BaseController<T, K> {
  abstract execute: (req: T) => Promise<Response<K>>;
}
