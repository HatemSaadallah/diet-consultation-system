import * as jwt from 'jsonwebtoken';
import { Consultants } from 'src/modules/consultants/consultants.model'; 


export const verifyToken: any = (token: string, secret: string) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return err;
    }
    return decode;
})

export const generateToken = (consultant: Consultants) => {
  const token = jwt.sign({ username: consultant.username, email: consultant.email }, 'secret');
  return token;
}