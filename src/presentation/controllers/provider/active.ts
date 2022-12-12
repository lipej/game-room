import {ErrorBase} from '#core/errors/base';
import {ActiveProviderUseCase} from '#core/use-cases/provider/active';
import {ActiveProviderDTO} from '#core/use-cases/provider/dtos/active';
import {BaseController, Response} from '../base';

export class ActiveProviderController extends BaseController<
  ActiveProviderDTO,
  undefined
> {
  constructor(private readonly useCase: ActiveProviderUseCase) {
    super();
  }

  execute = async (req: ActiveProviderDTO): Promise<Response> => {
    try {
      await this.useCase.perform(req);

      return {
        success: true,
        code: 200,
      };
    } catch (err) {
      return {
        success: false,
        error: <ErrorBase>err,
      };
    }
  };
}
