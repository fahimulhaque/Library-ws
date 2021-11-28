import * as BookService from "../../../src/books/service/books.service";

describe('Books Service', () => {
    it('Should fetch all the 7 books', async () => {
        const response = await BookService.findAll();
        expect(response).toHaveLength(7);
    });

    it('Should have book details with id 1', async () => {
        const response = await BookService.find(1);
        expect(response).toEqual({
            "id": 1,
            "title": "Graph-Powered Machine Learning",
            "isbn": "9781617295645",
            "author": "Alessandro Negro",
            "releaseDate": "Sat Nov 27 2021"
        });
    });


    it('After deleting, Total no of books should be 6', async () => {
        await BookService.remove(1);
        expect(Object.keys(BookService.books)).toHaveLength(6);
    });

    it('Should add book, Length should be 7', async () => {
        const response = await BookService.create({
            "title": "Graph-Powered Machine Learning",
            "isbn": "9781617295645",
            "author": "Alessandro Negro",
            "releaseDate": "2010/11/12"
        });
        expect(response.title).toBe("Graph-Powered Machine Learning")
        expect(Object.keys(BookService.books)).toHaveLength(7);
    });


    it('Should update book isbn no', async () => {
        const response = await BookService.update(3, {
            "title": "Real-World Cryptography",
            "isbn": "xxxxxxxxxxxxx",
            "author": "David Wong",
            "releaseDate": "Sun Sep 12 2021"
        });
        expect(response.isbn).toBe("xxxxxxxxxxxxx");
    });
});
