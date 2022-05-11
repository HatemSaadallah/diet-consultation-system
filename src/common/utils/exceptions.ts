import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from './errors';

const EXCEPTIONS = {
  USER_NOT_FOUND: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER_NOT_FOUND,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  LOGIN_ERROR: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.LOGIN_ERROR,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  USER_ALREADY_EXIST: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER_ALREADY_EXIST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  USER_NOT_AUTHORIZED: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER_NOT_AUTHORIZED,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  PASSWORD_INCORRECT: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.PASSWORD_INCORRECT,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
};

export { EXCEPTIONS };
