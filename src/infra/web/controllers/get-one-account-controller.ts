import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/validate-token';
import { makeGetOneAccountUseCase } from '../factories/make-get-one-account';
import { AccountPresenter } from '../presenters/account-presenter';

export class GetOneAccountController {
  static async handle(req: Request, res: Response) {
    const getOneAccount = makeGetOneAccountUseCase();

    const result = await getOneAccount.execute({
      id: (req as CustomRequest).accountId,
    });

    if (result.isLeft()) {
      return res.status(404).send({
        error: result.value.message,
      });
    }

    return res.status(200).send(AccountPresenter.toWeb(result.value));
  }
}
