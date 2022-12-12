import {ErrorBase} from '#core/errors/base';
import {LoginUserDTO} from '#core/use-cases/user/dtos/user/login';
import {LoginUserUseCase} from '#core/use-cases/user/login';
import {BaseController, Response} from '../base';

type LoginUserResponseDTO = {
  token: string;
};

export class LoginUserController extends BaseController<
  LoginUserDTO,
  LoginUserResponseDTO
> {
  constructor(private readonly useCase: LoginUserUseCase) {
    super();
  }

  execute = async (
    req: LoginUserDTO
  ): Promise<Response<LoginUserResponseDTO>> => {
    try {
      const token = await this.useCase.perform(req);

      return {
        success: true,
        code: 200,
        data: {token},
      };
    } catch (err) {
      return {
        success: false,
        error: <ErrorBase>err,
      };
    }
  };
}
