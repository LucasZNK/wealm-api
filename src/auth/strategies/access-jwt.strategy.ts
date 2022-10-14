import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/* It takes a JWT payload and returns a user object */
@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret', // TODO: Move to environment variable, reuse secret
    });
  }

  /**
   * It takes a JWT payload and returns a user object
   * @param {any} payload - The JWT payload.
   * @returns The userId and username from the payload.
   */
  async validate(payload: any) {
    return payload;
  }
}
