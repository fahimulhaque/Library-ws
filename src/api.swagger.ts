import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API for library books',
        version: '1.0.0',
        description: "This is a simple BOOKS CRUD API application",
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'local server',
        },
        {
            url: "https://ec2-3-81-142-1.compute-1.amazonaws.com",
            description: 'prod server',
        }
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/books/router/book.router.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);