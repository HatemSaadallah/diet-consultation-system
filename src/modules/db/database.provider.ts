import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, DATABASE_CONFIG } from '../../common/constants';
import { Answers } from '../answers/answers.model';
import { Consultants } from '../consultants/consultants.model';
import { Questions } from '../questions/questions.model';


export const databaseProvider = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([Consultants, Questions, Answers]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
