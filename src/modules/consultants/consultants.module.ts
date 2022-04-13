import { CacheModule, Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { ConsultantProvider } from './consultants.provider';
import { QuestionsProvider } from '../questions/questions.provider';
@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [ConsultantsController],
  providers: [ConsultantsService, ...ConsultantProvider, ...QuestionsProvider],
})
export class ConsultantsModule {}
