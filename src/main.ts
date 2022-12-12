import {grpcServer} from '#application/configs/grpc/server';
import {ServerCredentials} from '@grpc/grpc-js';
import dotenv from 'dotenv';
import {FastifyServer} from '#application/configs/http/server';

dotenv.config();

const {SERVER_ADDRESS, SERVER_PORT} = process.env;

const start = async () => {
  try {
    await FastifyServer.listen({port: 3000});
  } catch (err) {
    FastifyServer.log.error(err);
    throw err;
  }
};
start();

grpcServer.bindAsync(
  `${SERVER_ADDRESS}:${SERVER_PORT}`,
  ServerCredentials.createInsecure(),
  () => {
    console.log(`Server running at port ${SERVER_PORT}`);
    grpcServer.start();
  }
);
