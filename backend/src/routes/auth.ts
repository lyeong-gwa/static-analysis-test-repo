import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateSignup, validateLogin } from '../validators/auth.validator';

const router = Router();
const authController = new AuthController();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

export default router;
