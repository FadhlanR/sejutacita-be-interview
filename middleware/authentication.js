import { logger } from 'express-glass';
import jwt from 'jsonwebtoken';
import adminClient from '../client/admin_client';
import userClient from '../client/user_client';
import env from '../config/env';
import InternalServerError from '../error/internal_server_error';
import ParamIllegal from '../error/param_illegal';
import Unauthorized from '../error/unauthorized';
import { assertNotNull, assertTrue } from '../util/assert_util';
import responseUtil from '../util/response_util';

export const JwtAuth = async (req, res, next) => {
    try {
        assertNotNull(req.headers['token'], new ParamIllegal('token is required'));
        req.auth = jwt.verify(req.headers['token'], env.JWT_SECRET);
        next();
    } catch(e) {
        logger().error(`invalid jwt token, error = ${e}`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
    }
}