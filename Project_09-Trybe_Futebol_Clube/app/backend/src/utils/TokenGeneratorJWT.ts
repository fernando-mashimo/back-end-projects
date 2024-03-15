import * as jwt from 'jsonwebtoken';
import ITokenGenerator from '../Interfaces/ITokenGenerator';

export default class TokenGenereatorJWT implements ITokenGenerator {
  private jwt = jwt;
  private secret: string = process.env.JWT_SECRET || 'secret';

  decode(token: string): string {
    const decodedToken = this.jwt.decode(token, { complete: true });
    if (!decodedToken) return '';
    return decodedToken.payload.email;
  }

  generate(email: string): string {
    const token = this.jwt.sign({ email }, this.secret);
    return token;
  }

  verify(token: string): boolean {
    try {
      this.jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
