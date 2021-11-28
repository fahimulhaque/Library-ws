"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../../common/request-validation-error");
/**
 *
 * @returns {}
 */
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)('title').not().isEmpty().withMessage("Must not be empty").isString().withMessage("Must be String"),
        (0, express_validator_1.body)('isbn').isLength({ min: 13, max: 13 }).withMessage("ISBN length should be 13").isString().withMessage("Must be String"),
        (0, express_validator_1.body)('author').not().isEmpty().withMessage("Must not be empty").isString().withMessage("Must be String"),
        (0, express_validator_1.body)('releaseDate').optional().custom(isValidDate).withMessage('Invalid Date').isString().withMessage("Must be String")
    ];
};
exports.userValidationRules = userValidationRules;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    next(new request_validation_error_1.RequestValidationError(errors.array()));
};
exports.validate = validate;
/**
 * Check is date is valid date or not
 * @param {string} value Date in string format YYYY-MM-DD
 * @returns {boolean} true if valid date
 */
function isValidDate(value) {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/))
        return false;
    const date = new Date(value);
    const today = new Date();
    if (!date.getTime())
        return false;
    if (date.getTime() > today.getTime())
        return false;
    return date.toISOString().slice(0, 10) === value;
}
//# sourceMappingURL=book.validator.js.map