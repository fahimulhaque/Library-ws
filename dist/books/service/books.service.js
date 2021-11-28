"use strict";
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
exports.remove = exports.update = exports.create = exports.find = exports.findAll = exports.books = void 0;
const logger_1 = __importDefault(require("../../lib/logger"));
// In memory book store
exports.books = {
    1: {
        id: 1,
        title: "Graph-Powered Machine Learning",
        isbn: "9781617295645",
        author: "Alessandro Negro",
        releaseDate: "Sat Nov 27 2021"
    },
    2: {
        id: 2,
        title: "Architect Modern Web Applications with ASP.NET Core and Azure",
        isbn: "1001635859865",
        author: "Steve \"ardalis\" Smith",
        releaseDate: "'Mon Dec 29 2008'"
    },
    3: {
        id: 3,
        title: "Real-World Cryptography",
        isbn: "9781617296710",
        author: "David Wong",
        releaseDate: "Sun Sep 12 2021"
    },
    4: {
        id: 4,
        title: "Deep Learning with Python, 2nd Edition",
        isbn: "9781617296864",
        author: "François Chollet",
        releaseDate: "Thu Jun 16 2011"
    },
    5: {
        id: 5,
        title: "Pipeline as Code",
        isbn: "9781617297540",
        author: "Mohamed Labouardy",
        releaseDate: "Thu Feb 09 2017"
    },
    6: {
        id: 6,
        title: "Pandas in Action",
        isbn: "9781617297434",
        author: "Boris Paskhaver",
        releaseDate: "Wed Mar 23 2005"
    },
    7: {
        id: 7,
        title: "The Programmer's Brain",
        isbn: "9781617298677",
        author: "Felienne Hermans",
        releaseDate: "Wed Dec 11 2002"
    },
};
/**
 * Find all the books
 * @returns {Promise<Book[]>} promise object represents all the books
 */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(exports.books); });
exports.findAll = findAll;
/**
 * Find a book
 * @param {number} id  book id
 * @returns {Promise<Book>} promise object represents a book
 */
const find = (id) => __awaiter(void 0, void 0, void 0, function* () { return exports.books[id]; });
exports.find = find;
/**
 * Add a new book
 * @param {BaseBook} newBook new book
 * @returns {Promise<Book>} promise object represents a book
 */
const create = (newBook) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new Date().valueOf();
    logger_1.default.debug(`Adding new Book with id ${id}: ${JSON.stringify(newBook)}`);
    newBook.releaseDate = newBook.releaseDate ? new Date(newBook.releaseDate).toDateString() : "";
    exports.books[id] = Object.assign({ id }, newBook);
    return exports.books[id];
});
exports.create = create;
/**
 *
 * @param {number} id book id
 * @param {BaseBook} bookUpdate updated book detail
 * @returns {Promise<Book | null>} promise object represent updated book detail, if book doesn't exist then returns null
 */
const update = (id, bookUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, exports.find)(id);
    if (!book) {
        return null;
    }
    logger_1.default.debug(`Updating Book for id ${id}: ${JSON.stringify(bookUpdate)}`);
    bookUpdate.releaseDate = bookUpdate.releaseDate ? new Date(bookUpdate.releaseDate).toDateString() : "";
    exports.books[id] = Object.assign({ id }, bookUpdate);
    return exports.books[id];
});
exports.update = update;
/**
 *
 * @param {number} id book id
 * @returns {Promise<null | void>} null if books doesn't exist
 */
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, exports.find)(id);
    if (!book) {
        return null;
    }
    logger_1.default.debug(`Deleting Book for id ${id}`);
    delete exports.books[id];
});
exports.remove = remove;
//# sourceMappingURL=books.service.js.map