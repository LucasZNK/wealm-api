import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies/';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '60s', // TODO: Spike about refresh token and evaluate this time
      },
      secret: 'hide-me', //TODO: Move this to env variable.
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    UsersService,
  ],
})
export class AuthModule {}
