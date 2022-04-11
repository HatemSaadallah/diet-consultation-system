import { Injectable } from '@nestjs/common';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Injectable()
export class ConsultantsService {
  create(createConsultantDto: CreateConsultantDto) {
    return 'This action adds a new consultant';
  }

  findAll() {
    return `This action returns all consultants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  update(id: number, updateConsultantDto: UpdateConsultantDto) {
    return `This action updates a #${id} consultant`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}
