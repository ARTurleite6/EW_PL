import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User, UserType } from '../models/user';

export const JWT_SECRET = 'TOP_SECRET';

type Callback = (req: Request, res: Response, next: NextFunction) => void;

export default function authenticate(req: Request, res: Response, next: NextFunction): Callback {
    return passport.authenticate('local', { session: false }, (error: any, user: UserType, _info: Express.AuthInfo) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(401).json({ message: "Authentication failed", token: null });
        }

        req.login(user, { session: false }, async (error) => {
            if (error)
                return next(error);

            await User.updateOne({ _id: user._id }, { dataUltimoAcesso: new Date() }).exec()

            const body = { _id: user._id, email: user.email, name: user.nome, userType: user.nivel };
            const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: "1h" });

            res.json({ message: "Authentication sucessfully", token: token });
        });
    })(req, res, next);
}
