import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsultantsModule } from './modules/consultants/consultants.module';
import { DatabaseModule } from './modules/db/database.module';
import configFile from 'config';

@Module({
  imports: [
    DatabaseModule,
    ConsultantsModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
