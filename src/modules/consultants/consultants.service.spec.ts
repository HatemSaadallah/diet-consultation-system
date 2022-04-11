import { Test, TestingModule } from '@nestjs/testing';
import { ConsultantsService } from './consultants.service';

describe('ConsultantsService', () => {
  let service: ConsultantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultantsService],
    }).compile();

    service = module.get<ConsultantsService>(ConsultantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
