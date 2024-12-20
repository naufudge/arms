import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

type UserTokenType = {
    id: number,
    username: string,
    email: string,
    loyalty_points: number,
    role: string
}

const JWT_SECRET = process.env.TOKEN_SECRET;

export const createToken = (user: UserTokenType): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

export const getDataFromToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    // return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return payload
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
