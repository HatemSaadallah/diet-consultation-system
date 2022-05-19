import { Module } from '@nestjs/common';
import { AnnouncementsService } from './accouncements.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AnnouncementsService],
  exports: [AnnouncementsService],
})
export class AnnouncementModule {}
