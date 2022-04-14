import { HttpException, HttpStatus, Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Consultants } from './consultants.model';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { REPOSITORIES } from 'src/common/constants';
import { comparePassword, ERRORS, EXCEPTIONS, hashPassword } from 'src/common/utils';
import { LoginConsultantDto } from './dto/login-consultant.dto';
import { generateToken } from 'src/common/utils/jwt';
import { Cache } from 'cache-manager';
import { ConsultantInterface } from './objects/consultant.object';
import { Questions } from '../questions/questions.model';

@Injectable()
export class ConsultantsService {
  constructor(
    @Inject(REPOSITORIES.CONSULTANT_REPOSITORY)
    private consultantRepository: typeof Consultants,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject(REPOSITORIES.QUESTION_REPOSITORY)
    private questionRepository: typeof Questions,
  ) { }
  // DONE: Create a consultant
  async signup(createConsultantDto: CreateConsultantDto): Promise<Consultants> {
    const { password, ...restData } = createConsultantDto;
    const consultantByEmail: Consultants = await this.getConsultantByEmail(createConsultantDto.email);
    const consultantByUsername: Consultants = await this.getConsultantByUserName(createConsultantDto.username);

    if (consultantByEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORS.USER_ALREADY_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (consultantByUsername) {
      EXCEPTIONS.USER_ALREADY_EXIST;
    }
    const hashedPassword = await hashPassword(password);

    return this.consultantRepository.create({ ...restData, 'password': hashedPassword });
  }
  // DONE: Implement Login Feature
  async login(loginInfo: LoginConsultantDto): Promise<ConsultantInterface> {
    if (!loginInfo.loginToken) {
      EXCEPTIONS.LOGIN_ERROR;
    }
    let consultantFound: Consultants;
    switch(this.emailOrUsername(loginInfo.loginToken)) {
      case "EMAIL":
        console.log("IS EMAIL");
        
        consultantFound = await this.getConsultantByEmail(loginInfo.loginToken);
        if (!consultantFound) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: ERRORS.USER_NOT_FOUND,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        break;
      case "USERNAME":
        consultantFound = await this.getConsultantByUserName(loginInfo.loginToken);
        if (!consultantFound) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: ERRORS.USER_NOT_FOUND,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
    }
    
    const isPasswordValid = await comparePassword(loginInfo.password, consultantFound.password);
    if (!isPasswordValid) {
      EXCEPTIONS.PASSWORD_INCORRECT;
    }
    consultantFound.password = "";
    let token: string = generateToken(consultantFound);

    const consultantObject: ConsultantInterface = {
      ...consultantFound.get({plain:true}),
      token
    };
    await this.cacheManager.set('token', token, { ttl: 60 * 60 * 24 });
    await this.cacheManager.set('consultant', consultantFound.get({plain:true}), { ttl: 60 * 60 * 24 });

    return consultantObject;
  }
  async getConsultantByEmail(email: string): Promise<Consultants> {
    return this.consultantRepository.scope('basic').findOne({ where: { email } });
  }
  async getConsultantByUserName(username: string): Promise<Consultants> {
    return this.consultantRepository.scope('basic').findOne({ where: { username } });
  }
  // DONE: Implement see all questions
  // DONE: Add pagination
  
  // TODO: return all consultant info
  findAll() {
    return `This action returns all consultants`;
  }


  // getQuestionWithAnswersById(id: number) {
  //   return this.questionRepository.findOne(
  //     { where: { id } },

  //   );
  // }

  // update(id: number, updateConsultantDto: UpdateConsultantDto) {
  //   return `This action updates a #${id} consultant`;
  // }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
  // DONE: Check if Input is email or username
  private emailOrUsername(input: string): string {
    if (input.includes('@')) {
      return "EMAIL";
    } else {
      return "USERNAME";
    }
  }
}
