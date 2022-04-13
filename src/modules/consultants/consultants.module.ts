import { CacheModule, Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { ConsultantProvider } from './consultants.provider';
import { QuestionsProvider } from '../questions/questions.provider';
import { QuestionsService } from '../questions/questions.service';
@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [ConsultantsController],
  providers: [ConsultantsService, QuestionsService, ...ConsultantProvider, ...QuestionsProvider],
})
export class ConsultantsModule {}
