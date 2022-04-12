require('env2')('.env')

export default () => ({
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME_DEVELOPMENT || '',
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    jwt: {
        secret: process.env.JWTKEY || 'secret',
    },
});