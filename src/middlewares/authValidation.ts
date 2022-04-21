/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidator } from '../helpers/joi';
import { respondWithWarning } from '../helpers/respondHandlers';

export const validateVerifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result, {});
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result, {});
};

export const validateResendOtp = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result, {});
};

export const validateUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firstName: Joi.string().allow('', null),
    lastName: Joi.string().allow('', null),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result, {});
};

export const validateResetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const errors = await joiValidator(req.body, schema);
  if (!errors) return next();
  return respondWithWarning(res, 400, errors, {});
};

export const validateChangePassword = async (req: Request, res:Response, next: NextFunction) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });

  const errors = await joiValidator(req.body, schema);
  if (!errors) return next();
  return respondWithWarning(res, 400, errors, {});
};

// eslint-disable-next-line max-len
export const validateResetForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const resetPasswordSchema = Joi.object({
    newPassword: Joi.string().required(),
    email: Joi.string().email().required(),
    // otp: Joi.string().required(),
  });
  const errors = await joiValidator(req.body, resetPasswordSchema);
  if (!errors) return next();
  return respondWithWarning(res, 400, errors, {});
};

export const validateUpgradeAccount = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    cardId: Joi.number().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result, {});
};

export const validateSignup = async (req: Request, res: Response, next: NextFunction) => {
  console.log('validattion', req.body);
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().trim().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().trim().required(),
  });

  const result = await joiValidator(req.body, schema);
  if (!result) return next();
  return respondWithWarning(res, 400, result, {});
};