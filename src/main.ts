import {grpcServer} from '#application/configs/grpc/server';
import {ServerCredentials} from '@grpc/grpc-js';
import dotenv from 'dotenv';
import {FastifyServer} from '#application/configs/http/server';

dotenv.config();

const {SERVER_ADDRESS, SERVER_GRPC_PORT, SERVER_HTTP_PORT} = process.env;

const start = async () => {
  try {
    await FastifyServer.listen({
      port: Number(SERVER_HTTP_PORT),
      host: SERVER_ADDRESS,
    });
  } catch (err) {
    FastifyServer.log.error(err);
    throw err;
  }
};
start();

grpcServer.bindAsync(
  `${SERVER_ADDRESS}:${SERVER_GRPC_PORT}`,
  ServerCredentials.createInsecure(),
  () => {
    console.log(`Server running at port ${SERVER_GRPC_PORT}`);
    grpcServer.start();
  }
);
