import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './guards/jwt/jwt.strategy';
import { IsAuthenticated } from '../../resources/guards/auth';
import { LocalStrategy } from './guards/local/local.strategy';
import { JWT_SECRET_KEY } from '../../resources/helpers/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: IsAuthenticated,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
