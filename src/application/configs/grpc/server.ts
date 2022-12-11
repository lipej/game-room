import {Server} from '@grpc/grpc-js';
import {providerService} from './services/provider';
import {userService} from './services/user';

const grpcServer = new Server();

grpcServer.addService(userService.service, userService.implementation);
grpcServer.addService(providerService.service, providerService.implementation);

export {grpcServer};
