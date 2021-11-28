import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morganMiddleware from "./middleware/morganMiddleware";
import Logger from "./lib/logger";
import { bookRouter } from "./books/router/book.router";
import { errorHandler } from "./middleware/error-middleware";
import { notFoundHandler } from "./middleware/route-notFound-middleware";


dotenv.config();

// Exit is PORT is not 
if (!process.env.PORT) {
    Logger.info('Error to get PORT')
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

export const app = express();


// Apply app middleware
app.use(helmet());
app.use(cors());
app.use(morganMiddleware);

/**
 * parse incoming requests with JSON payloads
 * which populates the request object with a new body object containing the parsed data.
 */
app.use(express.json());

app.use("/api/library/books", bookRouter);

app.use(errorHandler);
app.use(notFoundHandler);


app.listen(PORT, () => {
    Logger.info(`Server is up and running on ${PORT}`);
});