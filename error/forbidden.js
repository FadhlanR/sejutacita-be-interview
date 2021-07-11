import { ERROR_CODE } from '../constant/error_code';
import CommonError from './common_error';

export default class Forbidden extends CommonError {
    constructor(message) {
        super(ERROR_CODE.FORBIDDEN, message);
    }
}