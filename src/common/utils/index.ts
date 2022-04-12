import * as bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
}

const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export enum ERRORS {
    LOGIN_ERROR = 'Email or password is incorrect',
    USER_NOT_FOUND = 'User not found',
    USER_ALREADY_EXIST = 'User already exist',
    USERNAME_USED = 'Username is used',
    USER_NOT_AUTHORIZED = 'User not authorized',
    ENTER_USERNAME_OR_EMAIL = 'Enter username or email',
    PASSWORD_INCORRECT = 'Password is incorrect',
};

export { hashPassword, comparePassword };
