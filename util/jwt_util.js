import ParamIllegal from "../error/param_illegal";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export const jwtVerify = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch(e) {
        if (e instanceof JsonWebTokenError) {
            throw new ParamIllegal('invalid token');
        }

        throw e;
    }
}