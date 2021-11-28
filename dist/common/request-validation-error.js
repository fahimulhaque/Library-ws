"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const customError_1 = require("./customError");
class RequestValidationError extends customError_1.CustomError {
    constructor(errors) {
        super('Invalid Request Parameters');
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation-error.js.map