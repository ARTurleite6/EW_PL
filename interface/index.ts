import express, { NextFunction, Response, Request } from "express";
import createError, { HttpError } from 'http-errors';
import authRouter from "./routers/authentication";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cookieParser from "cookie-parser";
import indexRouter from "./routers";
import morgan from 'morgan';
import requestSender from "./axios_instance";
import cors from "cors";

const app = express();

type AuthResponse = {
    message: string,
    token: string,
};

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:7777',
    credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use("/auth", authRouter);
app.use('/', indexRouter);

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const response = await requestSender.post('/api/authentication/login', { email: email, password: password });
            const data: AuthResponse = response.data;
            const token = data.token;
            return done(null, token);
        } catch (error) {
            done(error);
        }
    }
));


app.use((_req, _res, next: NextFunction) => {
    next(createError(404))
});

app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});

const port = 15030;

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});
