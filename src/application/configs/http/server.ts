import Fastify, {FastifyInstance} from 'fastify';
import {routes} from './routes';

const server: FastifyInstance = Fastify({logger: true});

for (const route of routes) {
  server.route(route);
}

export {server as FastifyServer};
