import Joi from "joi";
import { USER_ROLE } from "../constant/common_constant";

const userValidator = {}

const username = Joi.string()
    .required()
    .messages({
        "string.base": `username must be a string`,
        "string.empty": `username cannot be an empty`,
        "any.required": `username is required`
    });

const fullname = Joi.string()
    .required()
    .messages({
        "string.base": `fullname must be a string`,
        "string.empty": `fullname cannot be an empty`,
        "any.required": `fullname is required`
    });

const password = Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
    .messages({
        "string.base": `password must be a string`,
        "string.empty": `password cannot be an empty`,
        "string.min": `password should have a minimum length of {#limit}`,
        "string.pattern.base": `password must include lower case, upper case, number and symbol`,
        "any.required": `password is required`
    });

const role = Joi.string()
    .valid(USER_ROLE.USER, USER_ROLE.ADMIN)
    .required()
    .messages({
        "string.base": `role must be a string`,
        "any.only": `role must be one of {#valids}`,
        "string.empty": `role cannot be an empty`,
        "any.required": `role is required`
    });

const id = Joi.string()
    .required()
    .messages({
        "string.base": `id must be a string`,
        "string.empty": `id cannot be an empty`,
        "any.required": `id is required`
    });

const refresh_token = Joi.string()
    .required()
    .messages({
        "string.base": `refresh_token must be a string`,
        "string.empty": `refresh_token cannot be an empty`,
        "any.required": `refresh_token is required`
    });

userValidator.add = Joi.object().keys({
    username,
    fullname,
    password,
    role
});

userValidator.update = Joi.object().keys({
    id,
    fullname,
    password: password.allow(null),
    role
});

userValidator.login = Joi.object().keys({
    username,
    password
});

userValidator.generateAccessToken = Joi.object().keys({
    refresh_token
});

export default userValidator;