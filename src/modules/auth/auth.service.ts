import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/common/loggers/winston.logger';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

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
import { CreateUserCognitoDto } from './dto/create-user-cognito';
import { UserInfoDto } from 'src/common/dto/user-info.dto';
import { ChangePasswordDto } from './dto/change-password-dto';

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

  async register(createUserCognitoDto: CreateUserCognitoDto): Promise<any> {
    this.logger.log('Signup Called');

    const { password, email, ...restData } = createUserCognitoDto;
    // Check if user already exist
    const userByEmail: Users = await this.userService.getUserByEmail(
      createUserCognitoDto.email,
    );
    const userByUsername: Users = await this.userService.getUserByUserName(
      createUserCognitoDto.username,
    );

    if (userByEmail) {
      this.logger.warn(
        `User with email ${createUserCognitoDto.email} already exist`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with email ${createUserCognitoDto.email} already exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userByUsername) {
      this.logger.warn(
        `User with username ${createUserCognitoDto.username} already exist`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with username ${createUserCognitoDto.username} already exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
            this.logger.error(
              `Error while signing up user ${restData.username}`,
            );
            reject(
              new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: err.message,
                },
                HttpStatus.BAD_REQUEST,
              ),
            );
          } else {
            this.signupInDB(createUserCognitoDto);
          }
          resolve(result);
        },
      );
    });
  }

  signupInDB(createUserDto: CreateUserDto): Promise<Users> {
    this.logger.log(`User with email ${createUserDto.email} created`);
    return this.userService.create(createUserDto);
  }

  userLoginWithCognito(loginUserDto: LoginUserDto): Promise<any> {
    const { loginToken, password } = loginUserDto;
    const authenticationDetails = new AuthenticationDetails({
      // Username: username,
      Username: loginToken,
      Password: password,
    });
    const userData = {
      Username: loginToken,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
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
  changePassword(
    changePasswordDto: ChangePasswordDto,
    userInfo: UserInfoDto,
  ): Promise<any> {
    const { oldPassword, newPassword } = changePasswordDto;

    const authenticationDetails = new AuthenticationDetails({
      Username: userInfo.username,
      Password: oldPassword,
    });

    const userData = {
      Username: userInfo.username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          cognitoUser.changePassword(
            oldPassword,
            newPassword,
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
              } else {
                resolve({
                  result,
                });
              }
            },
          );
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
  private emailOrUsername(input: string): string {
    if (input.includes('@')) {
      return 'EMAIL';
    }
    return 'USERNAME';
  }
}
