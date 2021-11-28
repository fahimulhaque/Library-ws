export interface BaseBook {
    title: string,
    author: string,
    //check format for ISBN https://www.isbn-international.org/content/what-isbn
    isbn: string,
    releaseDate?: string
}

export interface Book extends BaseBook {
    id: number
}