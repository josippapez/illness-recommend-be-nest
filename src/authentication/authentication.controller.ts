import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);
    response.cookie('Accesstoken', accessTokenCookie, {
      path: '/',
    });
    response.cookie('Refreshtoken', refreshTokenCookie, {
      path: '/',
    });
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    const cookie = this.authenticationService.getCookieForLogOut();
    response.cookie('Accesstoken', cookie, {
      path: '/',
    });
    response.cookie('Refreshtoken', cookie, {
      path: '/',
    });
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Get('refresh')
  refresh(@Req() request: Request) {
    try {
      const refreshTokenData: any = this.jwtService.decode(
        request.cookies.Refreshtoken,
      );
      if (refreshTokenData) {
        const accessTokenCookie =
          this.authenticationService.getCookieWithJwtAccessToken(
            refreshTokenData.userId,
          );

        request.res.cookie('Accesstoken', accessTokenCookie, {
          path: '/',
        });

        return request.user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
