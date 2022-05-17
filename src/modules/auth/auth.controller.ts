import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserInfoDto } from 'src/common/dto/user-info.dto';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';
import { UserVerificationDto } from './dto/verify-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    // return this.authService.signup(createUserDto);
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginInfo: LoginUserDto): Promise<UserInterface> {
    // return this.authService.login(loginInfo);
    // console.log(1111111111, 'loginInfo');
    return this.authService.userLoginWithCognito(loginInfo);
  }

  @Post('verify')
  verify(
    @UserInfo() userInfo: UserInfoDto,
    @Body() userVerificationDto: UserVerificationDto,
  ): Promise<any> {
    return this.authService.verifyUser(userInfo, userVerificationDto);
  }
}
