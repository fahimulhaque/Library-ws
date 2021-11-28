import express, { NextFunction, Request, Response } from "express";
import * as BookService from "../service/books.service"
import { BaseBook, Book } from '../book.interface';
import { NotFoundError } from "../../common/not-found-error";
import { userValidationRules, validate } from "../validator/book.validator";


export const bookRouter = express.Router();


/**
 * @swagger
 * /api/library/books:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The book ID.
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: The book's name.
 *                         example: Head First
 *                       isbn:
 *                         type: string
 *                         description: isbn no of the book.
 *                         example: 1234567890123
 *                       author:
 *                         type: string
 *                         description: book author name.
 *                         example: Jack lee
 *                       releaseDate:
 *                         type: string
 *                         description: Release date of the book.
 *                         example: Tue 10 Dec 2020
*/
bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books: Book[] = await BookService.findAll();
        res.status(200).send(books)
    } catch (error) {
        next(error);
    }
});

// GET books/:id

bookRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const book: Book = await BookService.find(id);

        if (book) {
            return res.status(200).send(book);
        }
        throw new NotFoundError();
    } catch (error) {
        next(error);
    }
});

// POST items

bookRouter.post("/", userValidationRules(), validate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book: BaseBook = req.body;

        const newBook = await BookService.create(book);

        res.status(201).json(newBook);
    } catch (e) {
        next(e);
    }
});

// PUT books/:id

bookRouter.put("/:id", userValidationRules(), validate, async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const bookUpdate: Book = req.body;

        const existingBook: Book = await BookService.find(id);

        if (existingBook) {
            const updatedBook = await BookService.update(id, bookUpdate);
            return res.status(200).json(updatedBook);
        }

        const newBook = await BookService.create(bookUpdate);

        res.status(201).json(newBook);
    } catch (e) {
        next(e)
    }
});

// DELETE books/:id

bookRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const result = await BookService.remove(id);

        if (result === null) {
            throw new NotFoundError();
        }

        res.sendStatus(200);
    } catch (e) {
        next(e)
    }
});