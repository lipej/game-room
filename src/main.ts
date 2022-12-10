import {grpcServer} from '#application/configs/grpc/server';
import {ServerCredentials} from '@grpc/grpc-js';
import dotenv from 'dotenv';

dotenv.config();

const {SERVER_ADDRESS, SERVER_PORT} = process.env;

grpcServer.bindAsync(
  `${SERVER_ADDRESS}:${SERVER_PORT}`,
  ServerCredentials.createInsecure(),
  () => {
    console.log(`Server running at port ${SERVER_PORT}`);
    grpcServer.start();
  }
);
