import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../config/constants';

export const hashPassword = async (plaintext: string) => {
  const hashedText = await bcrypt.hash(
    plaintext,
    Number(SALT_ROUND),
  );
  return hashedText;
};

export const compareHash = async (plainText:string, hashedText: string) => {
  const match = await bcrypt.compare(plainText, hashedText);
  return match;
};
