import { logger } from 'express-glass';
import ParamIllegal from '../error/param_illegal';
import User from '../model/user_model';
import { assertNotNull, assertTrue } from '../util/assert_util';
import sha1 from 'sha1';
import DataNotFound from '../error/data_not_found';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { jwtVerify } from '../util/jwt_util';

const userService = {}

userService.add = async (request) => {
    logger().info(`Add new user, request = ${JSON.stringify(request)}`);
    const existingUser = await User.findOne({userName: request.username});
    assertTrue(!existingUser, new ParamIllegal('username already registered'));
    
    var newUser = new User();
    newUser.userName = request.username;
    newUser.fullName = request.fullname;
    newUser.password = sha1(request.password);
    newUser.role = request.role;
    await newUser.save();

    logger().info(`Success to add new user`);
    return newUser.toJson();
}

userService.update = async (request) => {
    logger().info(`Update user, request = ${JSON.stringify(request)}`);
    const existingUser = await User.findOne({_id: request.id});
    assertNotNull(existingUser, new DataNotFound('user not found'));

    existingUser.fullName = request.fullname;
    existingUser.password = request.password ? sha1(request.password) : existingUser.password;
    existingUser.role = request.role;
    await existingUser.save();

    logger().info(`Success to update user`);
    return existingUser.toJson();
}

userService.getById = async (id) => {
    logger().info(`Get user by id, id = ${id}`);
    const existingUser = await User.findOne({_id: id});
    assertNotNull(existingUser, new DataNotFound('user not found'));

    logger().info(`Success to get user by id`);
    return existingUser.toJson();
}

userService.getAll = async (offset, limit) => {
    logger().info(`Get all users, offset = ${offset}, limit = ${limit}`);
    const existingUsers = await User.find({}, null, {skip: Number(offset), limit: Number(limit)});
    logger().info(`Success to get all users`);
    return existingUsers;
}

userService.login = async (request) => {
    logger().info(`Login user, request = ${JSON.stringify(request)}`);
    const existingUser = await User.findOne({userName: request.username});
    assertTrue(existingUser && existingUser.password === sha1(request.password),new ParamIllegal('wrong username or password'));

    const accessToken = jwt.sign({ id: existingUser._id, role: existingUser.role }, env.ACCESS_TOKEN_SECRET, {expiresIn: "1 days"});
    const refreshToken = jwt.sign({ id: existingUser._id, role: existingUser.role }, env.REFRESH_TOKEN_SECRET, {expiresIn: "60 days"});

    logger().info(`Success to login user`);
    return {
        access_token: accessToken,
        refresh_token: refreshToken,
        id: existingUser._id
    };
}

userService.generateAccessToken = async (request) => {
    logger().info(`Generate access token, request = ${JSON.stringify(request)}`);
    const decoded = jwtVerify(request.refresh_token, env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, env.ACCESS_TOKEN_SECRET, {expiresIn: "1 days"});

    logger().info(`Success to generate access token`);
    return {
        access_token: accessToken
    };
}

export default userService;