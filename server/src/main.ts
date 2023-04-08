import { getConnection } from "./db/setup";
import express from 'express';
import { entriesRouter } from "./routers/entries_router";
import morgan from 'morgan';

export const mongoConn = getConnection();

const app = express()

app.use(express.json())

app.use('/entries', entriesRouter);

app.use(morgan('tiny'));

app.listen(8080, () => {
    console.log('Server listenning at http://localhost:8080');
});
