import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function authentication(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate(
        'local',
        { session: false },
        (error: any, token: string, _info: Express.AuthInfo) => {
            if (error) {
                return next(error);
            }
            if (!token)
                return next(new Error("Authentication Failed"));

            const payload = jwt.decode(token) as JwtPayload | null;
            const ex = payload?.exp;
            if (!payload || !ex)
                return next(new Error("Authentication Failed"));

            const expirationDate = new Date(ex * 1000);

            res.cookie("jwtToken", token, { httpOnly: true, secure: true, expires: expirationDate });
            next();
        }
    )(req, res, next);
}
