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
  let token;
  if (!consultant.email) {
    token = jwt.sign({ email: consultant.email }, process.env.JWTKEY || 'secret', { expiresIn: '8h' });
  } else {
    token = jwt.sign({ username: consultant.username }, process.env.JWTKEY || 'secret', { expiresIn: '8h' });
  }
  return token;
}