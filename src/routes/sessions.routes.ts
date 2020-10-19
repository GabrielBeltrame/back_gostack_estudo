import { Router } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

const SessionsRouter = Router();

SessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const { user, token } = await authenticate.execute({
    email,
    password
  });

  return response.json({ user, token });

});

export default SessionsRouter;
