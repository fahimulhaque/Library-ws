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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const BookService = __importStar(require("../service/books.service"));
const not_found_error_1 = require("../../common/not-found-error");
const book_validator_1 = require("../validator/book.validator");
exports.bookRouter = express_1.default.Router();
// GET books
exports.bookRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield BookService.findAll();
        res.status(200).send(books);
    }
    catch (error) {
        next(error);
    }
}));
// GET books/:id
exports.bookRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const book = yield BookService.find(id);
        if (book) {
            return res.status(200).send(book);
        }
        throw new not_found_error_1.NotFoundError();
    }
    catch (error) {
        next(error);
    }
}));
// POST items
exports.bookRouter.post("/", (0, book_validator_1.userValidationRules)(), book_validator_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const newBook = yield BookService.create(book);
        res.status(201).json(newBook);
    }
    catch (e) {
        next(e);
    }
}));
// PUT books/:id
exports.bookRouter.put("/:id", (0, book_validator_1.userValidationRules)(), book_validator_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const bookUpdate = req.body;
        const existingBook = yield BookService.find(id);
        if (existingBook) {
            const updatedBook = yield BookService.update(id, bookUpdate);
            return res.status(200).json(updatedBook);
        }
        const newBook = yield BookService.create(bookUpdate);
        res.status(201).json(newBook);
    }
    catch (e) {
        next(e);
    }
}));
// DELETE books/:id
exports.bookRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const result = yield BookService.remove(id);
        if (result === null) {
            throw new not_found_error_1.NotFoundError();
        }
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
//# sourceMappingURL=book.router.js.map