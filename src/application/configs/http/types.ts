import {FastifyReply, FastifyRequest} from 'fastify';

export type FastifyRoute = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  url: string;
  handler: (req: FastifyRequest, reply: FastifyReply) => Promise<unknown>;
};
