import chai from "chai";
import sha1 from "sha1";
import User from "../model/user_model";
import userService from "../service/user_service";
import ParamIllegal from "../error/param_illegal";

const expect = chai.expect;

describe("Add user test scenario", () => {
    var userName;

    before(() => {
        userName = 'accountTest';
    });

    after(async () => {
        await User.findOne({userName: userName}).deleteOne();
    });

    it(`should be success to add first user with userName ${userName}`, async () => {
        const request = {
            username: userName,
            fullname: 'Account Test',
            role: 'USER',
            password: 'AccountTest@1PWD'
        };


        const newUser = await userService.add(request);
        expect(newUser.userName).to.equal(request.username);
        expect(newUser.fullName).to.equal(request.fullname);
        expect(newUser.password).to.equal(sha1(request.password));
        expect(newUser.role).to.equal(request.role);
    });

    it(`should be error to add second user with userName ${userName}`, async () => {
        const request = {
            username: userName,
            fullname: 'Second Account Test',
            role: 'USER',
            password: 'AccountTest@1PWD'
        };


        try {
            await userService.add(request);
        } catch (e) {
            expect(e instanceof ParamIllegal).to.true;
            expect(e.message).to.equal('username already registered');
        }
    });
});