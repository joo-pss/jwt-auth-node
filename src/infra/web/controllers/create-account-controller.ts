import { Request, Response } from 'express';
import { makeCreateAccountUseCase } from '../factories/make-create-account';

export class CreateAccountController {
  static async handle(req: Request, res: Response) {
    const createAccount = makeCreateAccountUseCase();

    const result = await createAccount.execute(req.body);

    if (result.isLeft()) {
      return res.status(409).send({
        error: result.value.message,
      });
    }

    return res.status(201).send({
      accessToken: result.value.accessToken,
    });
  }
}
