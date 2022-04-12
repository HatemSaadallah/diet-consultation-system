import { Module } from '@nestjs/common';
import { ConsultantsModule } from './modules/consultants/consultants.module';

@Module({
  imports: [ConsultantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
