import {ErrorBase} from '#core/errors/base';
import {BaseController, Response} from '#presentation/controllers/base';
import {BaseMiddleware} from '#presentation/middlewares/base';
import {sendUnaryData, ServerUnaryCall} from '@grpc/grpc-js';

export class GRpcControllerAdapter {
  static adapt =
    <T, K>(
      controller: BaseController<T, K>,
      ...middlewares: BaseMiddleware[]
    ) =>
    async (
      call: ServerUnaryCall<T, Response<K>>,
      callback: sendUnaryData<Response<K>>
    ) => {
      try {
        if (middlewares) {
          for (const middleware of middlewares) {
            await middleware.execute(call.request);
          }
        }

        const result = await controller.execute(call.request);

        callback(null, result);
      } catch (err) {
        callback(null, {success: false, error: <ErrorBase>err});
      }
    };
}
