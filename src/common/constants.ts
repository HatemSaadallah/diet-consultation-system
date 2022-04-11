export const PROVIDERS = {
    DATABASE_PROVIDER: 'DbConnection',
};
export const DATABASE_CONFIG = 'database';


export const REPOSITORIES = {
    USER_REPOSITORY: 'USER_REPOSITORY',
    TODO_REPOSITORY: 'TODO_REPOSITORY',
};

export const winstonProvider = 'NestWinston';

export interface UserObject {
    id: number;
    username: string;
    role: string;
    token: string;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;
};

export enum RoleStatus {
    ADMIN = 'admin',
    USER = 'user',
}
