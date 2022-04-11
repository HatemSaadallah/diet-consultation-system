import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultantsModule } from './modules/consultants/consultants.module';

@Module({
  imports: [ConsultantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
