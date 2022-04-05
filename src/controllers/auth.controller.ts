/* eslint-disable max-len */
import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import { customAlphabet } from 'nanoid';
import { v4 as uuid } from 'uuid';
import { hashPassword, compareHash } from '../helpers/bcrypt';
import { respondWithSuccess, respondWithWarning } from '../helpers/respondHandlers';
import { generateTokenAndExpiry } from '../helpers/jwt';
import Models from '../database/models';

const { User} = Models;

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const {
    email, password, phoneNumber, referalCode,
  } = req.body;
  const lowerCasedEmail = email.toLowerCase();
  const userExist = await User.findOne({
    where: { [Op.or]: [{ email: lowerCasedEmail }, { phoneNumber }] },
  });
  if (userExist) return respondWithWarning(res, 409, 'a user exist with the email or phone number', null);
  const hashedPassword = await hashPassword(password);
    const user = await User.create({
      ...req.body,
      phoneNumber,
      email: lowerCasedEmail,
      password: hashedPassword,
      referrer: referalCode,
      isMerchantVerified: false,
      referalCode: nanoid(),
      accountType: 'user',
    });

  return respondWithSuccess(res, 200, 'user created successfully', user);
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) return respondWithWarning(res, 400, 'invalid email and password combination', null);
  const {
    dataValues, dataValues: {
      password: hashedPassword,
    },
  } = user;

  if (!user.password) return respondWithWarning(res, 401, 'Please reset your password to continue', null);
  const passwordMatch = await compareHash(password, hashedPassword);
  if (!passwordMatch) {
    return respondWithWarning(res, 400, 'invalid email and password combination', null);
  }

  const token = await generateTokenAndExpiry({ ...user }, null);
  user.lastLogin = new Date();
  await user.save();
  return respondWithSuccess(res, 200, 'User logged in successfully', {
    ...user.dataValues,
    token,
  });
}
