import * as jwt from 'jsonwebtoken';
// import jwk-to-pem
import * as jwkToPem from 'jwk-to-pem';

import { Users } from 'src/modules/users/users.model';

export const verifyToken: any = (token: string, secret: string) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return err;
    }

    return decode;
  });

//   //convert JWK keys to PEM format
//   const pem = jwkToPem(jwkPublicKey);

//   // verify id_token
//   const verified = jwt.verify(tokens.id_token, pem, { algorithms: ['RS256'] });
//   console.log('VERIFIED ID TOKEN');
//   console.log(verified);
// };

export const generateToken = (user: Users) => {
  const token = jwt.sign(
    { username: user.username, email: user.email, id: user.id },
    process.env.JWTKEY,
  );
  return token;
};
