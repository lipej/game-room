import {ErrorBase} from '#core/errors/base';
import {AddProviderUseCase} from '#core/use-cases/provider/add';
import {AddProviderDTO} from '#core/use-cases/provider/dtos/add';
import {BaseController, Response} from '../base';

export class AddProviderController extends BaseController<
  AddProviderDTO,
  undefined
> {
  constructor(private readonly useCase: AddProviderUseCase) {
    super();
  }

  execute = async (req: AddProviderDTO): Promise<Response> => {
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
