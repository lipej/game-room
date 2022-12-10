export type ResponseData<K> = {
  success: true;
  data?: K;
};

export type ResponseError = {
  success: false;
  error?: {
    code: number;
    message: string;
  };
};

export type Response<K = undefined> = ResponseData<K> | ResponseError;

export abstract class BaseController<T, K> {
  abstract execute: (req: T) => Promise<Response<K>>;
}
