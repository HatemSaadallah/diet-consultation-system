import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { CustomLogger } from 'src/common/logger/winston.logger';
import { UserInterface } from 'src/common/objects/user.object';
import {
  comparePassword,
  ERRORS,
  EXCEPTIONS,
  hashPassword,
} from 'src/common/utils';
import { generateToken } from 'src/common/utils/jwt';
import { Users } from '../users/users.model';
import { UserService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthService.name);
  // DONE: Create a user
  async signup(createUserDto: CreateUserDto): Promise<Users> {
    const { password, ...restData } = createUserDto;
    const userByEmail: Users = await this.userService.getUserByEmail(
      createUserDto.email,
    );
    const userByUsername: Users = await this.userService.getUserByUserName(
      createUserDto.username,
    );

    if (userByEmail) {
      throw new HttpException(
        `User with email ${createUserDto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userByUsername) {
      throw new HttpException(
        `User with username ${createUserDto.username} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hashPassword(password);

    return this.userService.create({
      ...restData,
      password: hashedPassword,
    });
  }
  // DONE: Implement Login Feature
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

  // DONE: Check if Input is email or username
  private emailOrUsername(input: string): string {
    if (input.includes('@')) {
      return 'EMAIL';
    }
    return 'USERNAME';
  }
}
