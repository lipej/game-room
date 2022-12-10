import {ServiceDefinition, UntypedServiceImplementation} from '@grpc/grpc-js';

export type GRpcService = {
  service: ServiceDefinition;
  implementation: UntypedServiceImplementation;
};
