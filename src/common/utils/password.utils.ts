import * as bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
}

const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };
