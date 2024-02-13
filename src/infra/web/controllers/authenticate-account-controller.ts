import { Request, Response } from 'express';
import { makeAuthenticateAccountUseCase } from '../factories/make-authenticate-account';

export class AuthenticateAccountController {
  static async handle(req: Request, res: Response) {
    const authenticateAccount = makeAuthenticateAccountUseCase();

    const result = await authenticateAccount.execute(req.body);

    if (result.isLeft()) {
      return res.status(401).send({
        error: result.value.message,
      });
    }

    return res.status(200).send({
      accessToken: result.value.accessToken,
    });
  }
}
