import express, { Request, Response, NextFunction } from 'express'
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan'
import { indexRouter } from './routers';

const app = express();

app.use(morgan('dev'));

app.use(express.json())

app.use('/api/genesis', indexRouter);

app.use(function(_req, _res, next) {
    next(createError(404));
});

app.use(function(err: HttpError, req: Request, res: Response, _next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});

const port = 7777;

app.listen(port, () => {
    console.log('listening on port ' + port);
});
