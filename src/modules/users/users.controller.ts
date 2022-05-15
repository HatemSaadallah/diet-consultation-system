import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Roles('consultant')
  @Delete('answer/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
