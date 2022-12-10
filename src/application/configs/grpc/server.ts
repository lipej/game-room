import {Server} from '@grpc/grpc-js';
import {userService} from './services/user';

const grpcServer = new Server();

grpcServer.addService(userService.service, userService.implementation);

export {grpcServer};
