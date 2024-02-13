import { Router } from 'express';
import { AuthenticateAccountController } from '../controllers/authenticate-account-controller';
import { CreateAccountController } from '../controllers/create-account-controller';
import { GetOneAccountController } from '../controllers/get-one-account-controller';
import { UpdateAccountController } from '../controllers/update-account-controller';
import { DeleteAccountController } from '../controllers/delete-account-controller';
import { validateToken } from '../middlewares/validate-token';
import { validateBody } from '../middlewares/validate-body';
import { authenticateAccountSchema } from '../schemas/authenticate-account-schema';
import { createAccountSchema } from '../schemas/create-account-schema';
import { updateAccountSchema } from '../schemas/update-account-schema';

export const router = Router();

router.post(
  '/sessions',
  validateBody(authenticateAccountSchema),
  AuthenticateAccountController.handle,
);

router.post(
  '/accounts',
  validateBody(createAccountSchema),
  CreateAccountController.handle,
);

router.get('/accounts', validateToken, GetOneAccountController.handle);

router.put(
  '/accounts',
  validateToken,
  validateBody(updateAccountSchema),
  UpdateAccountController.handle,
);

router.delete('/accounts', validateToken, DeleteAccountController.handle);
