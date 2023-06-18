import { Router } from "express";
import { authentication } from "../controllers/authentication";
import requestSender from "../axios_instance";

const authRouter = Router();

authRouter.get('/register', (_req, res) => {
    res.render('register');
});

authRouter.post('/register', async (req, res) => {
    const newUser = req.body;
    console.dir(newUser);
    try {
        const response = await requestSender.post('api/authentication/register', newUser);
        res.status(response.status).send(response.data);

    } catch (error) {
        res.status(400).send(error);
    }
});

authRouter.post('/login', authentication, (_req, res) => {
    res.redirect('/');
});

authRouter.get('/login', (_req, res) => {
    res.render('login');
});

export default authRouter;
