import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User, UserType } from '../models/user';

export const JWT_SECRET = 'TOP_SECRET';

type Callback = (req: Request, res: Response, next: NextFunction) => void;

export function authenticate(req: Request, res: Response, next: NextFunction): Callback {
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

            const expirationDate = new Date(Date.now() + 3_600_000);

            res.cookie("jwtToken", token, { secure: true, expires: expirationDate, sameSite: "none" });
            res.status(200).json({ message: "Authentication sucessfully", token: token });
        });
    })(req, res, next);
}

export async function registration(userData: UserType): Promise<{ user?: UserType, error?: { message: string, statusCode: number } }> {

    const response = await User.exists({ email: userData.email }).exec();

    if (response) return { user: undefined, error: { message: "Conflict on Email", statusCode: 404 } };

    const newUser = new User(userData);
    try {
        const response = await newUser.save();
        return { user: response, error: undefined };
    } catch (error) {
        return { user: undefined, error: { message: "Error creating new User", statusCode: 400 } };
    }
}
