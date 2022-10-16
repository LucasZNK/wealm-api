import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserSecured } from '../dto/login-response';

/* 
The validate method is called by Passport when the user logs in. The validate method calls the
validateUser method of the AuthService class. If the user credentials are valid, the validateUser
method returns the user object. If the user credentials are invalid, the validateUser method returns
null */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserSecured> {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
