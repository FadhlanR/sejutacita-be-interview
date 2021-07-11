import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import UserResponse from "../response/user_response";
import userService from "../service/user_service";
import { assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import userValidator from "../validator/user_validator";

const userController = {}

userController.add = async (req, res, next) => {
    try {
        logger().info(`Add new user request`);
        const validationResult = userValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const newUser = await userService.add(validationResult.value);
        responseUtil.success(res, new UserResponse(newUser.id, newUser.userName, newUser.fullName, 
            newUser.role, newUser.createdAt, newUser.updatedAt));
    } catch(e) {
        logger().error(`Add new user failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.update = async (req, res, next) => {
    try {
        logger().info(`Update user request`);
        const validationResult = userValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const newUser = await userService.update(validationResult.value);
        responseUtil.success(res, new UserResponse(newUser.id, newUser.userName, newUser.fullName, 
            newUser.role, newUser.createdAt, newUser.updatedAt));
    } catch(e) {
        logger().error(`Update user failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.query = async (req, res, next) => {
    try {
        logger().info(`Update user request`);
        assertNotNull(req.query, new ParamIllegal('request query is required'));

        let result;
        if (req.query.id) {
            const user = await userService.getById(req.query.id);
            result = new UserResponse(user.id, user.userName, user.fullName, 
                user.role, user.createdAt, user.updatedAt);
        } else if (req.query.offset && req.query.limit) {
            const users = await userService.getAll(req.query.offset, req.query.limit);
            result = [];
            for (const user of users) {
                result.push(new UserResponse(user.id, user.userName, user.fullName, 
                    user.role, user.createdAt, user.updatedAt));
            }
        } else {
            throw new ParamIllegal('unknown request query');
        }

        responseUtil.success(res, result);
    } catch(e) {
        logger().error(`Update user failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.login = async (req, res, next) => {
    try {
        logger().info(`Login user request`);
        const validationResult = userValidator.login.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        responseUtil.success(res, await userService.login(validationResult.value));
    } catch(e) {
        logger().error(`Login user failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.generateAccessToken = async (req, res, next) => {
    try {
        logger().info(`Generate access token request`);
        const validationResult = userValidator.generateAccessToken.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        responseUtil.success(res, await userService.generateAccessToken(validationResult.value));
    } catch(e) {
        logger().error(`Generate access token failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default userController;