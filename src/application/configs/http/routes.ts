import {AuthMiddlewareFactory} from '#application/factories/auth-middleware';
import {AddProviderControllerFactory} from '#application/factories/provider-add-controller';
import {UserLoginControllerFactory} from '#application/factories/user-login-controller';
import {UserRegisterControllerFactory} from '#application/factories/user-register-controller';
import {FastifyControllerAdapter} from './controller-adapter';
import {FastifyRoute} from './types';

export const routes: FastifyRoute[] = [
  {
    method: 'POST',
    url: '/user/register',
    handler: FastifyControllerAdapter.adapt(
      UserRegisterControllerFactory.create()
    ),
  },
  {
    method: 'POST',
    url: '/user/login',
    handler: FastifyControllerAdapter.adapt(
      UserLoginControllerFactory.create()
    ),
  },
  {
    method: 'POST',
    url: '/provider/add',
    handler: FastifyControllerAdapter.adapt(
      AddProviderControllerFactory.create(),
      AuthMiddlewareFactory.create()
    ),
  },
];
