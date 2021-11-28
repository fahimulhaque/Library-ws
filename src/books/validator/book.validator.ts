
import { validationResult, body } from "express-validator"
import { RequestValidationError } from "../../common/request-validation-error"


/**
 * 
 * @returns {}
 */
export const userValidationRules = () => {
    return [
        body('title').not().isEmpty().withMessage("Must not be empty").isString().withMessage("Must be String"),
        body('isbn').isLength({ min: 13, max: 13 }).withMessage("ISBN length should be 13").isString().withMessage("Must be String"),
        body('author').not().isEmpty().withMessage("Must not be empty").isString().withMessage("Must be String"),
        body('releaseDate').optional().custom(isValidDate).withMessage('Invalid Date').isString().withMessage("Must be String")
    ]
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    next(new RequestValidationError(errors.array()));
}



/**
 * Check is date is valid date or not
 * @param {string} value Date in string format YYYY-MM-DD 
 * @returns {boolean} true if valid date
 */
function isValidDate(value: string) {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

    const date = new Date(value);
    const today = new Date();
    if (!date.getTime()) return false;
    if (date.getTime() > today.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
}