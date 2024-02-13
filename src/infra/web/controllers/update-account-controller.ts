import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/validate-token';
import { makeUpdateAccountUseCase } from '../factories/make-update-account';
import { NotFoundError } from '@/app/use-cases/errors/not-found';

export class UpdateAccountController {
  static async handle(req: Request, res: Response) {
    const updateAccount = makeUpdateAccountUseCase();

    const result = await updateAccount.execute({
      ...req.body,
      id: (req as CustomRequest).accountId,
    });

    if (result.isLeft()) {
      if (result.value instanceof NotFoundError) {
        return res.status(404).send({
          error: result.value.message,
        });
      }

      return res.status(409).send({
        error: result.value.message,
      });
    }

    return res.sendStatus(204);
  }
}
