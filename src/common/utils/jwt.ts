import * as jwt from 'jsonwebtoken';
import { Users } from 'src/modules/users/users.model'; 


export const verifyToken: any = (token: string, secret: string) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return err;
    }

    return decode;
})

export const generateToken = (consultant: Users) => {
  const token = jwt.sign({ username: consultant.username, email: consultant.email, id: consultant.id }, process.env.JWTKEY);
  return token;
}