import Jwt from 'jsonwebtoken';
import {
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_EXPIRATION,
} from '../config/constants';

export const generateTokenAndExpiry = async (data: string | object, expiresIn: any) => {
  const token = Jwt.sign(data, TOKEN_SECRET_KEY as string, {
    expiresIn: expiresIn || TOKEN_EXPIRATION,
  });
  return token;
};

export const signRefreshToken = async (data: string | object) => {
  const refreshToken = Jwt.sign(data, REFRESH_TOKEN_SECRET_KEY as string, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
  return refreshToken;
};

export const verifyToken = (token: string) => Jwt.verify(token, TOKEN_SECRET_KEY as string);

export const verifyRefreshToken = (refreshToken: string) => {
  const refToken = Jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY as string);
  return refToken;
};
