import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './common/logger/winston.logger';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger()
  });
  await app.listen(3001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
