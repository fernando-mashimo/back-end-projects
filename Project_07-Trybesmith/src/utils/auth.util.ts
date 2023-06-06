import jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/types/TokenPayload';

const secret = process.env.JWT_SECRET || 'secret';

const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verify = (token: string): TokenPayload => {
  const payload = jwt.verify(token, secret) as TokenPayload;
  return payload;
};

export default {
  sign,
  verify,
  secret,
};
