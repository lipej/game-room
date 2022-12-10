import {loadPackageDefinition, ServiceDefinition} from '@grpc/grpc-js';
import {loadSync} from '@grpc/proto-loader';
import path from 'path';
import {GRpcControllerAdapter} from '../shared/controller-adapter';
import {DEFAULT_PROTO_PATH, LOADER_OPTIONS} from '../shared/constants';
import {GRpcService} from '../shared/types';
import {UserRegisterControllerFactory} from '#application/factories/user-register-controller';

const PROTO_PATH = 'game_room/core/user/v1/user.proto';

const packageDef = loadSync(
  path.join(__dirname, DEFAULT_PROTO_PATH, PROTO_PATH),
  LOADER_OPTIONS
);

type PackageDefinition = {
  game_room: {
    core: {user: {v1: {UserService: {service: ServiceDefinition}}}};
  };
};

const grpcObj = loadPackageDefinition(
  packageDef
) as unknown as PackageDefinition;

export const userService: GRpcService = {
  service: grpcObj.game_room.core.user.v1.UserService.service,
  implementation: {
  },
};
