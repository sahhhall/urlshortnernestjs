import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dtos/signup.dto';
import { SigninDTO } from './dtos/signin.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  //sign up
  @Post('signup') //auth/signup auth use as prefix in this controller by _
  async signUp(@Body() signupData: SignupDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.signup(signupData, res);
  }

  @Post('signin')
  async login(@Body() credentials: SigninDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(credentials, res)
  }
  //login

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const userId = req.user['_id'];
    return this.authService.logout(userId, res);
  }


  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: { _id: string,name:string }){
    return user;
  }

}
