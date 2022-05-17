import * as jwt from 'jsonwebtoken';
// import jwk-to-pem
import * as jwkToPem from 'jwk-to-pem';

import { Users } from 'src/modules/users/users.model';

const jwkPublicKey = {
  alg: 'RS256',
  e: 'AQAB',
  kid: 'm8i6qsn9Jzj4R4CEiqARqHnJQTHv72O442bgjB/nHRA=',
  kty: 'RSA',
  n: 'z0hQrxf71Ccv0WVdvvt3g0CfovLmlyjg-6uDrTUT_hUN-u3n8uF5I56Hd4pY798b_eSRe4jpnZC4TGpxg6tLITNDxemjTWGjlK_r4UDFCGGj607Ls8hrx4hp_ihBevNG3KgPXhITpUXZUDlDf5lOfiM5czrFtmzTf91cNwR36ykFf_kMBbaq1tbJRjEo6QdqtcyF5aJTBhE4LmaVMARqpyvwfkyA9aH6LbplOoTtPr2tSarDyNFIu5M804ffwZfGgKZNTS2L2egreCB1r0fmBdRfy--4OvnnEFtEtTYya_UbKffTtzZ8U2gYUO7c06qGDnDINfnKJV-wvu3y7PQebw',
  use: 'sig',
};

export const verifyIDToken = (tokens) => {
  const pem = jwkToPem(jwkPublicKey);

  const verified = jwt.verify(
    tokens,
    pem,
    { algorithms: ['RS256'] },
    (err, decoded) => {
      if (err) {
        return false;
      }
      return decoded;
    },
  );
  return verified;
};

export const generateToken = (user: Users) => {
  const token = jwt.sign(
    { username: user.username, email: user.email, id: user.id },
    process.env.JWTKEY,
  );
  return token;
};
