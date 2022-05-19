import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { UserProvider } from './users.provider';

import { QuestionsModule } from '../questions/questions.module';
import { AnnouncementModule } from '../announcements/announcements.module';
@Module({
  imports: [QuestionsModule, AnnouncementModule],
  controllers: [UserController],
  providers: [UsersService, ...UserProvider],
  exports: [UsersService],
})
export class UsersModule {}
