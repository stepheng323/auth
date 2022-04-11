import { Router } from 'express';
import { checkAuth } from '../../middlewares/auth';
import {
  validateSignup, validateLogin
} from '../../middlewares/authValidation';
import {
  signup,login
} from '../../controllers/auth.controller';

const auth = Router();

auth.post('/signup', validateSignup, signup);
auth.post('/login', validateLogin, login);



export default auth;
