import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { CustomLogger } from 'src/common/logger/winston.logger';
import {
  comparePassword,
  ERRORS,
  EXCEPTIONS,
  hashPassword,
} from 'src/common/utils';
import { generateToken } from 'src/common/utils/jwt';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from './objects/user.object';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
  ) {}

  private readonly logger = new CustomLogger(UserService.name);
  // DONE: Create a user
  async signup(createUserDto: CreateUserDto): Promise<Users> {
    const { password, ...restData } = createUserDto;
    const userByEmail: Users = await this.getUserByEmail(createUserDto.email);
    const userByUsername: Users = await this.getUserByUserName(
      createUserDto.username,
    );

    if (userByEmail) {
      // EXCEPTIONS.USER_ALREADY_EXIST;
      throw new HttpException(
        `User with email ${createUserDto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userByUsername) {
      // EXCEPTIONS.USER_ALREADY_EXIST;
      throw new HttpException(
        `User with username ${createUserDto.username} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hashPassword(password);

    return this.userRepository.create({
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
        userFound = await this.getUserByEmail(loginInfo.loginToken);
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
        userFound = await this.getUserByUserName(loginInfo.loginToken);
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
      EXCEPTIONS.PASSWORD_INCORRECT;
    }
    // userFound.password = '';
    const token: string = generateToken(userFound);
    const userObject: UserInterface = {
      ...userFound.get({ plain: true }),
      token,
    };
    return userObject;
  }
  async getUserByEmail(email: string): Promise<Users> {
    return this.userRepository.scope('basic').findOne({ where: { email } });
  }
  async getUserByUserName(username: string): Promise<Users> {
    return this.userRepository.scope('basic').findOne({ where: { username } });
  }

  // DONE: Implement see all questions
  // DONE: Add pagination
  findUserById(userId: number): Promise<Users> {
    return this.userRepository.scope('basic').findOne({
      where: { id: userId },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  // DONE: Check if Input is email or username
  private emailOrUsername(input: string): string {
    if (input.includes('@')) {
      return 'EMAIL';
    }
    return 'USERNAME';
  }
}
