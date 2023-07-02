import express, { Request, Response, NextFunction } from 'express'
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan'
import { indexRouter } from './routers/genesis';
import authRouter from './routers/authentication';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/user';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import listEndpoints from 'express-list-endpoints';
import { JWT_SECRET } from './controllers/authetication';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const cookieExtractor = (req: express.Request) => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies.jwtToken;
    }
    return jwt;
}

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey: JWT_SECRET,
},
    async (jwtPayload, cb) => {
        try {
            const user = await User.findByIdAndUpdate(jwtPayload.user._id, { dataUltimoAcesso: new Date() }).exec();
            if (user) {
                return cb(null, user);
            }
            else {
                return cb(new Error("User does not exist"));
            }
        } catch (error) {
            return cb(error);
        }
    }
));

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done) => {
            try {
                const user = await User.findOne({ email: email }).exec();
                if (!user) {
                    return done(null, false, { message: 'Incorrect email or password' });
                } else {
                    if (!user.isPasswordValid(password)) {
                        return done(null, false, { message: 'Incorrect email or password' });
                    }
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

app.use('/api/authentication', authRouter);
app.use('/api/genesis', passport.authenticate('jwt', { session: false }), indexRouter);

app.use((_req, _res, next) => {
    next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});

const port = 7777;

console.log(listEndpoints(app));

app.listen(port, () => {
    console.log('listening on port ' + port);
});
