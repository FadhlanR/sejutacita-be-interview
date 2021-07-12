import chai from "chai";
import sha1 from "sha1";
import User from "../model/user_model";
import userService from "../service/user_service";
import ParamIllegal from "../error/param_illegal";
import { jwtVerify } from "../util/jwt_util";
import env from "../config/env";

const expect = chai.expect;

describe("User login test scenario", () => {
    var user;
    const request = {
        username: 'AccountTest',
        fullname: 'Account Test',
        role: 'USER',
        password: 'AccountTest@1PWD'
    };

    before(async () => {
        user = await userService.add(request);
    });

    after(async () => {
        await User.findOne({userName: user.userName}).deleteOne();
    });

    it(`should be success to login`, async () => {
        const loginRequest = {
            username: request.username,
            password: request.password
        }

        const tokens = await userService.login(loginRequest);
        const decoded = jwtVerify(tokens.access_token, env.ACCESS_TOKEN_SECRET);
        const userId = String(user.id);
        expect(String(decoded.id)).to.equal(userId);
        expect(String(tokens.id)).to.equal(userId);
    });

    it(`should be success to failed, wrong username`, async () => {
        const loginRequest = {
            username: 'unknownuser',
            password: request.password
        }

        try {
            await userService.login(loginRequest);
        } catch (e) {
            expect(e instanceof ParamIllegal).to.true;
            expect(e.message).to.equal('wrong username or password');
        }
    });

    it(`should be success to failed, wrong password`, async () => {
        const loginRequest = {
            username: request.username,
            password: 'wrong password'
        }

        try {
            await userService.login(loginRequest);
        } catch (e) {
            expect(e instanceof ParamIllegal).to.true;
            expect(e.message).to.equal('wrong username or password');
        }
    });
});