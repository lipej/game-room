import {loadPackageDefinition, ServiceDefinition} from '@grpc/grpc-js';
import {loadSync} from '@grpc/proto-loader';
import path from 'path';
import {GRpcControllerAdapter} from '../shared/controller-adapter';
import {DEFAULT_PROTO_PATH, LOADER_OPTIONS} from '../shared/constants';
import {GRpcService} from '../shared/types';
import {AddProviderControllerFactory} from '#application/factories/provider-add-controller';
import {AuthMiddlewareFactory} from '#application/factories/auth-middleware';

const PROTO_PATH = 'game_room/core/provider/v1/provider.proto';

const packageDef = loadSync(
  path.join(__dirname, DEFAULT_PROTO_PATH, PROTO_PATH),
  LOADER_OPTIONS
);

type PackageDefinition = {
  game_room: {
    core: {provider: {v1: {ProviderService: {service: ServiceDefinition}}}};
  };
};

const grpcObj = loadPackageDefinition(
  packageDef
) as unknown as PackageDefinition;

export const providerService: GRpcService = {
  service: grpcObj.game_room.core.provider.v1.ProviderService.service,
  implementation: {
    addProvider: GRpcControllerAdapter.adapt(
      AddProviderControllerFactory.create(),
      AuthMiddlewareFactory.create()
    ),
  },
};
