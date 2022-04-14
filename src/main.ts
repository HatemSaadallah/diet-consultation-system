import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './common/guards/auth.guard';
import { CustomLogger } from './common/logger/winston.logger';
import { ConsultantsService } from './modules/consultants/consultants.service';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const consultantService = app.get(ConsultantsService);

  const configService = app.get(ConfigService);
  app.useGlobalGuards(new AuthGuard(new ConfigService(), new Reflector(), consultantService));

  await app.listen(configService.get('PORT'));
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
