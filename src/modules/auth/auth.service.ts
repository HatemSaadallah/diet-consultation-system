import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/common/loggers/winston.logger';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

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

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { UserVerificationDto } from './dto/verify-user.dto';
import { UserInfoDto } from 'src/common/dto/user-info.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(
    @Inject(UsersService)
    private userService: UsersService,

    private readonly logger: CustomLogger,
    private readonly configService: ConfigService,
  ) {
    this.logger = new CustomLogger();
    this.logger.info('AuthService created');

    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get('COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get('COGNITO_CLIENT_ID'),
    });
  }

  register(createUserDto: CreateUserDto): Promise<any> {
    this.logger.log('Signup Called');

    const { password, email, ...restData } = createUserDto;
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    );

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        restData.username,
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            this.logger.error(err.stack);
            reject(
              new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: err.message,
                },
                HttpStatus.BAD_REQUEST,
              ),
            );
          }
          this.signup(createUserDto);
          resolve(result);
        },
      );
    });
  }

  verifyUser(
    userInfo: UserInfoDto,
    userVerificationDto: UserVerificationDto,
  ): Promise<any> {
    const { verificationCode } = userVerificationDto;
    const { email, username } = userInfo;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    console.log(111111111, verificationCode);
    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log('call result: ' + result);
      },
    );
    return new Promise((resolve, reject) => {
      resolve(0);
    });
  }

  async signup(createUserDto: CreateUserDto): Promise<Users> {
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
  userLoginWithCognito(loginUserDto: LoginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result.getIdToken().getJwtToken());

          const token = result.getIdToken().getJwtToken();
          resolve({
            result,
          });
        },
        onFailure: (err) => {
          this.logger.error(err.stack);
          reject(
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: err.message,
              },
              HttpStatus.BAD_REQUEST,
            ),
          );
        },
      });
    });
  }

  async login(loginInfo: LoginUserDto): Promise<UserInterface> {
    if (!loginInfo.username) {
      EXCEPTIONS.LOGIN_ERROR;
    }
    let userFound: Users;
    switch (this.emailOrUsername(loginInfo.username)) {
      case 'EMAIL':
        userFound = await this.userService.getUserByEmail(loginInfo.username);

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
          loginInfo.username,
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
