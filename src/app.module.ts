import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/db/database.module';
import configFile from 'config';
import { CustomLogger } from './common/loggers/winston.logger';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswerModule } from './modules/answers/answers.module';
import { requestLoggerMiddleware } from './common/middleware/cls.middleware';
import { SQSModule } from './modules/sqs/sqs.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    QuestionsModule,
    AnswerModule,
    SQSModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [CustomLogger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(requestLoggerMiddleware).forRoutes('*');
  }
}
