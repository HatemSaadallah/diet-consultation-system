import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export class CustomLogger extends ConsoleLogger {
  debug(message: string) {
    super.error(message);
    logger.error(message);
  }

  error(message: string) {
    super.error(message);
    logger.error(message);
  }

  log(message: string) {
    super.log(message);
    logger.info(message);
  }

  warn(message: string) {
    super.warn(message);
    logger.warn(message);
  }
}
