import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/common/logger/winston.logger';
import { UserInterface } from 'src/common/interfaces/user.interface';
import {
  comparePassword,
  ERRORS,
  EXCEPTIONS,
  hashPassword,
} from 'src/common/utils';
import { generateToken } from 'src/common/utils/jwt';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private userService: UsersService,

    private readonly logger: CustomLogger,
  ) {
    this.logger = new CustomLogger('AuthService');
    this.logger.info('AuthService created');
  }

  // DONE: Create a user
  async signup(createUserDto: CreateUserDto): Promise<Users> {
    this.logger.log('Signup Called');
    const { password, ...restData } = createUserDto;
    const userByEmail: Users = await this.userService.getUserByEmail(
      createUserDto.email,
    );
    const userByUsername: Users = await this.userService.getUserByUserName(
      createUserDto.username,
    );

    if (userByEmail) {
      this.logger.warn(`User with email ${createUserDto.email} already exist`);
      throw new HttpException(
        `User with email ${createUserDto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userByUsername) {
      this.logger.warn(
        `User with username ${createUserDto.username} already exist`,
      );

      throw new HttpException(
        `User with username ${createUserDto.username} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hashPassword(password);
    this.logger.log(`User with email ${createUserDto.email} created`);
    return this.userService.create({
      ...restData,
      password: hashedPassword,
    });
  }

  async login(loginInfo: LoginUserDto): Promise<UserInterface> {
    if (!loginInfo.loginToken) {
      EXCEPTIONS.LOGIN_ERROR;
    }
    let userFound: Users;
    switch (this.emailOrUsername(loginInfo.loginToken)) {
      case 'EMAIL':
        userFound = await this.userService.getUserByEmail(loginInfo.loginToken);

        if (!userFound) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: ERRORS.USER_NOT_FOUND,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        break;
      case 'USERNAME':
        userFound = await this.userService.getUserByUserName(
          loginInfo.loginToken,
        );

        if (!userFound) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: ERRORS.USER_NOT_FOUND,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        break;
      default:
        '';
    }
    const isPasswordValid = await comparePassword(
      loginInfo.password,
      userFound.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORS.PASSWORD_INCORRECT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    userFound = userFound.get({ plain: true });
    delete userFound.password;
    const token: string = generateToken(userFound);
    const userObject: UserInterface = {
      ...userFound,
      token,
    };
    return userObject;
  }

  private emailOrUsername(input: string): string {
    if (input.includes('@')) {
      return 'EMAIL';
    }
    return 'USERNAME';
  }
}
