import { logger } from 'express-glass';
import env from '../config/env';
import { USER_ROLE } from '../constant/common_constant';
import ParamIllegal from '../error/param_illegal';
import Unauthorized from '../error/unauthorized';
import { assertNotNull, assertTrue } from '../util/assert_util';
import { jwtVerify } from '../util/jwt_util';
import responseUtil from '../util/response_util';

export const JwtAuth = async (req, res, next) => {
    try {
        assertNotNull(req.headers['authorization'], new ParamIllegal('authorization is required'));
        const bearerTokens = req.headers['authorization'].split(' ');
        assertTrue(bearerTokens.length >= 2, new ParamIllegal('invalid bearer token'));
        assertTrue(bearerTokens[0] === 'Bearer', new ParamIllegal('invalid bearer token prefix'));
        req.auth = jwtVerify(bearerTokens[1], env.ACCESS_TOKEN_SECRET);
        next();
    } catch(e) {
        logger().error(`invalid jwt token, error = ${e}`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
    }
}

export const onlyAdmin = (req, res, next) => {
    try {
        assertNotNull(req.auth, new ParamIllegal('auth is required'));
        assertTrue(req.auth.role === USER_ROLE.ADMIN, new ParamIllegal('auth role must be admin'));
        next();
    } catch(e) {
        logger().error(`invalid jwt token, error = ${e}`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
    }
}

export const adminOrRelatedUser = (req, res, next) => {
    try {
        assertNotNull(req.auth, new ParamIllegal('auth is required'));
        const userId = req.query.id ? req.query.id : req.body.id;
        console.log(req.auth.id);
        console.log(userId);
        assertTrue(req.auth.role === USER_ROLE.ADMIN || userId === req.auth.id, new ParamIllegal('auth role must be admin or related user'));
        next();
    } catch(e) {
        logger().error(`invalid jwt token, error = ${e}`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
    }
}