import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Consultants } from './consultants.model';
import { CreateConsultantDto } from './dto/create-consultant.dto';
// import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { REPOSITORIES } from 'src/common/constants';
import { ERRORS, hashPassword } from 'src/common/utils';
@Injectable()
export class ConsultantsService {
  constructor(
    @Inject(REPOSITORIES.CONSULTANT_REPOSITORY)
    private consultantRepository: typeof Consultants,
  ) {}

  async signup(createConsultantDto: CreateConsultantDto): Promise<Consultants> {
    const { password, ...restData } = createConsultantDto;
    const consultant: Consultants = await this.getConsultantByEmail(createConsultantDto.email);
    console.log(22222, consultant);
    
    if(consultant) {
      
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORS.USER_ALREADY_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hashPassword(password);
    
    return this.consultantRepository.create({ ...restData, 'password': hashedPassword });
  }

  async getConsultantByEmail(email: string): Promise<Consultants> {
    
    return this.consultantRepository.findOne({ where: { email } });
  }

  findAll() {
    return `This action returns all consultants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  // update(id: number, updateConsultantDto: UpdateConsultantDto) {
  //   return `This action updates a #${id} consultant`;
  // }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}
