"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../common/customError");
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (err instanceof customError_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(500).send({
        errors: [{ message: err.message }],
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-middleware.js.map