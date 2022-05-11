import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { UserInterface } from 'src/common/objects/user.object';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): any {
    return this.authService.signup(createUserDto);
  }
  @Public()
  @Post('login')
  login(@Body() loginInfo: LoginUserDto): Promise<UserInterface> {
    return this.authService.login(loginInfo);
  }
}
