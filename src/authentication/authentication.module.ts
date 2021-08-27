/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { ConfigModule } from '@nestjs/config';

import { JwtAccessTokenStrategy } from './jwt-access-token.strategy';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtRefreshTokenStrategy,
    JwtAccessTokenStrategy,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
