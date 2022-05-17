/* eslint-disable complexity */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME_DEVELOPMENT || '',
    dialect: process.env.DB_DIALECT || 'mysql',
    userPoolId: process.env.COGNITO_USER_POOL_ID || '',
    clientId: process.env.COGNITO_CLIENT_ID || '',
    region: process.env.COGNITO_REGION || '',
    authority: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
  },
  jwt: {
    secret: process.env.JWTKEY || 'secret',
  },
});
