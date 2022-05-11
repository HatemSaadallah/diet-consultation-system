import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { CustomLogger } from 'src/common/logger/winston.logger';
import { UserInterface } from 'src/common/objects/user.object';
import { Users } from './users.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
  ) {}

  private readonly logger = new CustomLogger(UserService.name);

  getUserByEmail(email: string): Promise<Users> {
    return this.userRepository.scope('basic').findOne({ where: { email } });
  }
  getUserByUserName(username: string): Promise<Users> {
    return this.userRepository.scope('basic').findOne({ where: { username } });
  }

  create(user: any): Promise<Users> {
    return this.userRepository.create(user);
  }

  // DONE: Implement see all questions
  // DONE: Add pagination
  findUserById(userId: number): Promise<Users> {
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
