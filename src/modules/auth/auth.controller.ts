import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserModel } from '../users/users.model';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt/jwt-auth.guard';
import { Public } from '../../resources/helpers/decorators';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ type: UserModel })
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('protected')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserModel })
  async protected(@Request() req) {
    return req.user;
  }
}
