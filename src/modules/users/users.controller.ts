import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators';
import { AnnouncementsService } from '../announcements/accouncements.service';
import { CreateAnnouncementDto } from './dto/createAnnouncement.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly announcementService: AnnouncementsService,
  ) {}

  @Roles('consultant')
  @Delete('answer/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Roles('admin')
  @Post('/admin/announcement')
  announceMessage(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementService.announceMessage(createAnnouncementDto);
  }
}
