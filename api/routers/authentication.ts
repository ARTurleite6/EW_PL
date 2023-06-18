import { Router, Request, Response } from "express";
import { authenticate, registration } from "../controllers/authetication";

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    const userParams = req.body;

    const response = await registration(userParams);
    if (response.error) {
        const error = response.error;
        return res.status(error.statusCode).send(error.message);
    } else {
        return res.status(201).send('User Created Sucessfully');
    }

});

authRouter.post('/login', authenticate);

export default authRouter;
