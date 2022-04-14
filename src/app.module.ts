import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsultantsModule } from './modules/consultants/consultants.module';
import { DatabaseModule } from './modules/db/database.module';
import configFile from 'config';
import { CustomLogger } from './common/logger/winston.logger';

@Module({
  imports: [
    CacheModule.register(),
    DatabaseModule,
    ConsultantsModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [ CustomLogger ],
  exports: [ CustomLogger ],
})
export class AppModule {}
