import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/db/database.module';
import configFile from 'config';
import { CustomLogger } from './common/logger/winston.logger';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswerModule } from './modules/answers/answers.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    QuestionsModule,
    AnswerModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [CustomLogger],
})
export class AppModule {}
