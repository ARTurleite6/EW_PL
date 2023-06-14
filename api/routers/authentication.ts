import { Router, Request, Response } from "express";
import { User } from "../models/user";
import authenticate from "../controllers/authetication";

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    const userParams = req.body;

    const user = new User(userParams);

    try {
        const newUser = await user.save();
        res.json({ message: "User registered sucessfully", user: newUser });
    } catch (error) {
        res.json({ message: 'Error creating User', user: null });
    }
});

authRouter.post('/login', authenticate);

export default authRouter;
