import { Controller, Post, Body, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserInfoDto } from 'src/common/dto/user-info.dto';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password-dto';
import { CreateUserCognitoDto } from './dto/create-user-cognito';
import { UserVerificationDto } from './dto/verify-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(
    @Body() createUserCognitoDto: CreateUserCognitoDto,
  ): Promise<CreateUserDto> {
    return this.authService.register(createUserCognitoDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginInfo: LoginUserDto): Promise<UserInterface> {
    return this.authService.userLoginWithCognito(loginInfo);
  }

  @Put('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @UserInfo() userInfo: UserInfoDto,
  ): Promise<any> {
    return this.authService.changePassword(changePasswordDto, userInfo);
  }
}
