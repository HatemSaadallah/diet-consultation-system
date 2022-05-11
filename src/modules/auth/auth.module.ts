import { Module } from '@nestjs/common';
import { CustomLogger } from 'src/common/logger/winston.logger';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, CustomLogger],
})
export class AuthModule {}
