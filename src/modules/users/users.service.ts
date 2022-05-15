import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { CustomLogger } from 'src/common/loggers/winston.logger';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
  ) {}

  private readonly logger = new CustomLogger();

  getUserByEmail(email: string): Promise<Users> {
    this.logger.log(`Attempting to get user with email ${email}`);
    return this.userRepository.scope('basic').findOne({ where: { email } });
  }
  getUserByUserName(username: string): Promise<Users> {
    this.logger.log(`Attempting to get user with username ${username}`);
    return this.userRepository.scope('basic').findOne({ where: { username } });
  }

  create(user: any): Promise<Users> {
    this.logger.log(`Attempting to create user ${user.username}`);
    return this.userRepository.create(user);
  }

  findUserById(userId: number): Promise<Users> {
    this.logger.log(`Attempting to get user with id ${userId}`);
    return this.userRepository.scope('basic').findOne({
      where: { id: userId },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
