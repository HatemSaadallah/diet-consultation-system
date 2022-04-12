import { CacheModule, Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { ConsultantProvider } from './consultants.provider';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [ConsultantsController],
  providers: [ConsultantsService, ...ConsultantProvider],
})
export class ConsultantsModule {}
