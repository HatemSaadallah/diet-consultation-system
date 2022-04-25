import * as jwt from 'jsonwebtoken';
import { Users } from 'src/modules/users/users.model'; 


export const verifyToken: any = (token: string, secret: string) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return err;
    }

    return decode;
})

export const generateToken = (user: Users) => {
  const token = jwt.sign({ username: user.username, email: user.email, id: user.id }, process.env.JWTKEY);
  return token;
}