import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { clsNamespace } from '../services/cls-hooked.service';

const requestLogger = new Logger('http');

export const requestLoggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  clsNamespace.bindEmitter(request);
  clsNamespace.bindEmitter(response);

  const startDate = Date.now();
  const requestId = request.header('RequestId');
  const requestUrl = request.url;
  const requestMethod = request.method;

  response.append('requestId', requestId);

  let responseBody: any;
  const defaultWrite = response.write;
  const defaultEnd = response.end;
  const chunks = [];

  response.write = (...restArgs: any) => {
    chunks.push(Buffer.from(restArgs[0]));
    return defaultWrite.apply(response, restArgs);
  };

  response.end = (...restArgs: any) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }
    const body = Buffer.concat(chunks).toString('utf8');

    try {
      responseBody = JSON.parse(body);
    } catch (error) {
      responseBody = body;
    }

    return defaultEnd.apply(response, restArgs);
  };

  clsNamespace.run(() => {
    clsNamespace.set('requestId', requestId ?? '-');
    clsNamespace.set('requestUrl', requestUrl ?? '-');
    clsNamespace.set('requestMethod', requestMethod ?? '-');

    response.on('finish', () => {
      const endDate = Date.now();
      const duration = endDate - startDate;
      const statusCode = response.statusCode;
      requestLogger.log(
        `${requestId} ${requestMethod} ${requestUrl} ${statusCode} ${duration}ms`,
      );
    });

    next();
  });
};
