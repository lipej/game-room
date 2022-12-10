import {ErrorBase} from '#core/errors/base';
import {RegisterUserDTO} from '#core/use-cases/user/dtos/user/register';
import {RegisterUserUseCase} from '#core/use-cases/user/register';
import {BaseController, Response} from '../base';

export class RegisterUserController extends BaseController<
  RegisterUserDTO,
  undefined
> {
  constructor(private readonly useCase: RegisterUserUseCase) {
    super();
  }

  execute = async (req: RegisterUserDTO): Promise<Response> => {
    try {
      await this.useCase.perform(req);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: <ErrorBase>err,
      };
    }
  };
}
