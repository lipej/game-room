import {ErrorBase} from '#core/errors/base';
import {BaseController} from '#presentation/controllers/base';
import {BaseMiddleware} from '#presentation/middlewares/base';
import {FastifyReply, FastifyRequest} from 'fastify';

export class FastifyControllerAdapter {
  static adapt =
    <T, K>(
      controller: BaseController<T, K>,
      ...middlewares: BaseMiddleware[]
    ) =>
    async (req: FastifyRequest, reply: FastifyReply) => {
      const request = {};

      Object.assign(request, req.body);
      Object.assign(request, req.headers);
      Object.assign(request, req.params);

      try {
        if (middlewares) {
          for (const middleware of middlewares) {
            await middleware.execute(request);
          }
        }

        const result = await controller.execute(<T>request);

        reply
          .status(result.code || 500)
          .send(result.success ? result : {message: result.error?.message});
      } catch (err) {
        console.log({err});
        if (err instanceof ErrorBase)
          reply.status(err.code).send({message: err.message});

        reply.status(500).send({message: (err as Error).message});
      }
    };
}
