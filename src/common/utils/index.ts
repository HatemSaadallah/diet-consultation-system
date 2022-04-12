import * as bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
}

const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const ERRORS = {
    LOGIN_ERROR: 'Email or password is incorrect',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXIST: 'User already exist',
    USER_NOT_AUTHORIZED: 'User not authorized',
    FORBIDDEN_UPDATE_ORDER: 'You are not allowed to update this order',
    ORDER_IS_PICKEDUP: 'Order is pickedup',
};

export { hashPassword, comparePassword };
