import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
