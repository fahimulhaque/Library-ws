import Logger from "../../lib/logger";
import { BaseBook, Book } from "../book.interface";
import { Books } from "../books.interface";

// In memory book store
export const books: Books = {
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
}

/**
 * Find all the books
 * @returns {Promise<Book[]>} promise object represents all the books
 */
export const findAll = async (): Promise<Book[]> => Object.values(books);

/**
 * Find a book
 * @param {number} id  book id
 * @returns {Promise<Book>} promise object represents a book
 */
export const find = async (id: number): Promise<Book> => books[id];

/**
 * Add a new book
 * @param {BaseBook} newBook new book
 * @returns {Promise<Book>} promise object represents a book
 */
export const create = async (newBook: BaseBook): Promise<Book> => {
    const id = new Date().valueOf();
    Logger.debug(`Adding new Book with id ${id}: ${JSON.stringify(newBook)}`);
    newBook.releaseDate = newBook.releaseDate ? new Date(newBook.releaseDate).toDateString() : "";
    books[id] = { id, ...newBook };
    return books[id];
};


/**
 * 
 * @param {number} id book id
 * @param {BaseBook} bookUpdate updated book detail
 * @returns {Promise<Book | null>} promise object represent updated book detail, if book doesn't exist then returns null
 */
export const update = async (id: number, bookUpdate: BaseBook): Promise<Book | null> => {
    const book = await find(id);

    if (!book) {
        return null;
    }
    Logger.debug(`Updating Book for id ${id}: ${JSON.stringify(bookUpdate)}`);
    bookUpdate.releaseDate = bookUpdate.releaseDate ? new Date(bookUpdate.releaseDate).toDateString() : "";

    books[id] = { id, ...bookUpdate };

    return books[id];
};

/**
 * 
 * @param {number} id book id
 * @returns {Promise<null | void>} null if books doesn't exist
 */
export const remove = async (id: number): Promise<null | void> => {
    const book = await find(id);

    if (!book) {
        return null;
    }

    Logger.debug(`Deleting Book for id ${id}`);

    delete books[id];
};