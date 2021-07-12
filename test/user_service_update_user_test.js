import chai from "chai";
import sha1 from "sha1";
import User from "../model/user_model";
import userService from "../service/user_service";
import ParamIllegal from "../error/param_illegal";
import DataNotFound from "../error/data_not_found";

const expect = chai.expect;

describe("Update user test scenario", () => {
    var user;

    before(async () => {
        const request = {
            username: 'AccountTest',
            fullname: 'Account Test',
            role: 'USER',
            password: 'AccountTest@1PWD'
        };


        user = await userService.add(request);
    });

    after(async () => {
        await User.findOne({userName: user.userName}).deleteOne();
    });

    it(`should be success to update user`, async () => {
        const request = {
            id: user.id,
            fullname: 'Account Test Updated',
            role: 'USER',
            password: 'AccountTest@1PWDUpdated'
        };


        const newUser = await userService.update(request);
        expect(newUser.fullName).to.equal(request.fullname);
        expect(newUser.password).to.equal(sha1(request.password));
        expect(newUser.role).to.equal(request.role);
    });

    it(`should be success to update user, even though password null`, async () => {
        const request = {
            id: user.id,
            fullname: 'Account Test Updated',
            role: 'USER',
            password: null
        };


        const newUser = await userService.update(request);
        expect(newUser.fullName).to.equal(request.fullname);
        expect(newUser.role).to.equal(request.role);
    });

    it(`should be failed to update user, user not found`, async () => {
        const request = {
            id: '60eb218e9bce218a642def71',
            fullname: 'Account Test Updated',
            role: 'USER',
            password: null
        };


        try {
            await userService.update(request);
        } catch (e) {
            expect(e instanceof DataNotFound).to.true;
            expect(e.message).to.equal('user not found');
        }
    });
});