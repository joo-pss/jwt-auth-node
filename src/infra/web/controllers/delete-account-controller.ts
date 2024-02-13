import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/validate-token';
import { makeDeleteAccountUseCase } from '../factories/make-delete-account';

export class DeleteAccountController {
  static async handle(req: Request, res: Response) {
    const deleteAccount = makeDeleteAccountUseCase();

    const result = await deleteAccount.execute({
      id: (req as CustomRequest).accountId,
    });

    if (result.isLeft()) {
      return res.status(404).send({
        error: result.value.message,
      });
    }

    return res.sendStatus(204);
  }
}
