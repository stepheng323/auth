/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt';
import { respondWithWarning } from '../helpers/respondHandlers';
import Model from '../database/models';

export const checkAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return respondWithWarning(res, 401, 'No token provided', null);
  }
  try {
    const auth = verifyToken(token);
    req.auth = auth;
    const user = await Model.User.findByPk(req.auth.id);
    if (!user) return respondWithWarning(res, 404, 'no user found', null);
    if (user.isBlacklisted) return respondWithWarning(res, 403, 'please contact support', user);
    req.auth = user;
    return next();
  } catch (error: any) {
    if (error.message === 'JsonWebTokenError') return respondWithWarning(res, 401, 'invalid token', null);
    return respondWithWarning(res, 401, error.message, null);
  }
};
