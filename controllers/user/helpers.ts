import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../env"

export const getSignedToken = (id:string) => {
    return jwt.sign({id}, JWT_SECRET, {
      expiresIn: '30d'
    });
  };