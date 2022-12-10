import {BaseController, Response} from '#presentation/controllers/base';
import {sendUnaryData, ServerUnaryCall} from '@grpc/grpc-js';

export class GRpcControllerAdapter {
  static adapt =
    <T, K>(controller: BaseController<T, K>) =>
    async (
      call: ServerUnaryCall<T, Response<K>>,
      callback: sendUnaryData<Response<K>>
    ) => {
      const result = await controller.execute(call.request);

      callback(null, result);
    };
}
