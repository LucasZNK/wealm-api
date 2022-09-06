import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/* It takes a JWT payload and returns a user object */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hide-me', // TODO: Move to environment variable, reuse secret
    });
  }

  /**
   * It takes a JWT payload and returns a user object
   * @param {any} payload - The JWT payload.
   * @returns The userId and username from the payload.
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
