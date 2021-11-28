"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
const logger_1 = __importDefault(require("./lib/logger"));
const book_router_1 = require("./books/router/book.router");
const error_middleware_1 = require("./middleware/error-middleware");
const route_notFound_middleware_1 = require("./middleware/route-notFound-middleware");
dotenv.config();
// Exit is PORT is not 
if (!process.env.PORT) {
    logger_1.default.info('Error to get PORT');
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
exports.app = (0, express_1.default)();
// Apply app middleware
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(morganMiddleware_1.default);
/**
 * parse incoming requests with JSON payloads
 * which populates the request object with a new body object containing the parsed data.
 */
exports.app.use(express_1.default.json());
exports.app.use("/api/library/books", book_router_1.bookRouter);
exports.app.use(error_middleware_1.errorHandler);
exports.app.use(route_notFound_middleware_1.notFoundHandler);
exports.app.listen(PORT, () => {
    logger_1.default.info(`Server is up and running on ${PORT}`);
});
//# sourceMappingURL=index.js.map