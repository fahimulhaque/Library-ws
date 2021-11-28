import request from 'supertest'
import { app } from '../../../src/index';
import * as BookService from '../../../src/books/service/books.service'


describe('books resources ', () => {

    it('Should return all the books', async () => {
        const response = await request(app).get('/api/library/books');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(Object.values(BookService.books));
    });


    it('Should return resource not found if route does not exist', async () => {
        const response = await request(app).get('/api/library/book');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: "Resource not found" });
    });


    it('Should return book with id -1', async () => {
        const response = await request(app).get('/api/library/books/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "id": 1,
            "title": "Graph-Powered Machine Learning",
            "isbn": "9781617295645",
            "author": "Alessandro Negro",
            "releaseDate": "Sat Nov 27 2021"
        });
    });

    it('Should return not found if book does not exist', async () => {
        const response = await request(app).get('/api/library/books/12');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            errors:
                [{
                    message: "Not Found"
                }]
        });
    });

    it('Should add a book', async () => {
        const response = await request(app).post('/api/library/books').send({
            "title": "Graph-Powered Machine Learning",
            "isbn": "xxxxxxxxxxxxx",
            "author": "Alessandro Negro",
            "releaseDate": "2002-11-12"
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.isbn).toEqual("xxxxxxxxxxxxx");
    });

    it('Should update author name to Fahim', async () => {
        const response = await request(app).put('/api/library/books/1').send({
            "title": "Graph-Powered Machine Learning",
            "isbn": "9781617295645",
            "author": "Fahim",
            "releaseDate": "2021-11-27"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.author).toEqual("Fahim");
    });

    it('Should Delete entry for id 1', async () => {
        const response = await request(app).delete('/api/library/books/1');
        expect(response.statusCode).toBe(200);
    });

    it('Deleting book that does not exist should return 404', async () => {
        const response = await request(app).delete('/api/library/books/1');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            errors:
                [{
                    message: "Not Found"
                }]
        });
    });

    it('Should check empty value for title', async () => {
        const response = await request(app).post('/api/library/books').send({
            "title": "",
            "isbn": "xxxxxxxxxxxxx",
            "author": "Alessandro Negro",
            "releaseDate": "2002-11-12"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            errors:
                [{
                    field: "title",
                    message: "Must not be empty"
                }]
        });
    });

})