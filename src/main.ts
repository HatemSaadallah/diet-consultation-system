import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './common/guards/auth.guard';
import { CustomLogger } from './common/logger/winston.logger';
import { UsersService } from './modules/users/users.service';
import { RolesGuard } from './common/guards/roles.guard';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const userService = app.get(UsersService);

  const configService = app.get(ConfigService);
  app.useGlobalGuards(
    new AuthGuard(new ConfigService(), new Reflector(), userService),
    new RolesGuard(new Reflector()),
  );

  await app.listen(configService.get('PORT'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
